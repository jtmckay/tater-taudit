import { Command } from 'commander'
import { buildTopLevelPackageList, buildTree, execute, fillTreeViability, flattenDependentTree, getYarnAudits, getYarnInfo, sortFlatDependentTree } from "./yarnAudit"

const program = new Command();

type FixCommandOptions = {
  all?: boolean
  dependent_tree?: string
  major_upgrade: boolean
  upgrade?: boolean
}

program.description('An application for fixing security vulnerabilities')
.option('-h, --help', 'Print out command options').addHelpText('after', `
  Examples:
    $ tater-audit fix upgrade
      -- Upgrades all dependents down to the lowest dependency found in the audit with a dependency that has a fix available

    $ tater-audit log
      -- Creates a tree of all dependents, from the lowest dependency to the highest dependent, found in the audit.
`
    );

program
  .command('fix')
  .description('Fix audit dependencies')
  .option('-a, --all', 'Run all available fixes automatically')
  .option('-d, --dependent_tree <path>', 'Path to the dependent tree (to avoid regenerating)')
  .option('-m, --major_upgrade', 'Attempt to install newer versions (perhaps major; breaking changes)')
  // .option('-t, --test_command <command>', 'Command to run between changes to apply as many fixes as possible without breaking changes')
  .option('-u, --upgrade', 'Upgrade audit dependencies with a fix available')
  .action((options: FixCommandOptions) => {
    main(options)
  }).addHelpText('after', `
  Examples:
    $ tater-audit fix -u
      -- Upgrades all dependents down to the lowest dependency found in the audit with a dependency that has a fix available
    $ tater-audit fix
`
    );

program
  .command('log')
  .description('Logs out a tree dependents of any packages identified in the audit')
  .action(() => {
    log()
  }).addHelpText('after', `
Examples:
  $ tater-audit log
    -- Creates a tree of all dependents, from the lowest dependency to the highest dependent, found in the audit.
`
  );

program.parse(process.argv);

export async function main(options: FixCommandOptions) {
  let viableTree
  const initialYarnAudits = await getYarnAudits()

  if (options.dependent_tree) {
    const tree = buildTree(initialYarnAudits)
    const yarnInfo = await getYarnInfo()

    viableTree = await fillTreeViability(tree, yarnInfo)
  } else {
    viableTree = require(options.dependent_tree as string)
  }

  if (options.all || options.upgrade) {
    const flatTree = flattenDependentTree(viableTree)
    const sortedFlatTree = sortFlatDependentTree(flatTree)

    const upgradeList = new Set<string>()
    sortedFlatTree.filter(i => i.latestViableVersion || i.version).forEach(i => upgradeList.add(i.name))
    const upgradeArray = Array.from(upgradeList).reverse()
    for (var packageName = upgradeArray.pop(); upgradeArray.length > 0; packageName = upgradeArray.pop()) {
      await execute(`yarn upgrade ${packageName}`)
    }
  }

  if (options.all || options.major_upgrade) {
    if (options.all || options.upgrade) {
      const tree = buildTree(initialYarnAudits)
      const yarnInfo = await getYarnInfo()
      viableTree = await fillTreeViability(tree, yarnInfo)
    }
    const flatTree = flattenDependentTree(viableTree)
    const sortedFlatTree = sortFlatDependentTree(flatTree)

    const topLevelPackageList = await buildTopLevelPackageList()

    const upgradeList = new Set<string>()
    sortedFlatTree.filter(i => i.latestViableVersion || i.version).forEach(i => upgradeList.add(i.name))
    const upgradeArray = Array.from(upgradeList).reverse()
    
    for (var packageName = upgradeArray.pop(); upgradeArray.length > 0; packageName = upgradeArray.pop()) {
      const topLevelPackages = topLevelPackageList.filter(i => i.name === packageName)
      if (topLevelPackages.length) {
        await Promise.all(topLevelPackages.map(topLevelPackage => console.log(`yarn ${topLevelPackage.workspace ? `workspace ${topLevelPackage.workspace} ` : ''}add ${packageName}${!topLevelPackage.workspace ? ' --ignore-workspace-root-check' : ''}`)))
      }
    }
  }
  
  const postYarnAudits = await getYarnAudits()
  console.log(`Initial audits: ${initialYarnAudits.length}. Post upgrades: ${postYarnAudits.length}.`)
  if (initialYarnAudits.length > postYarnAudits.length) {
    console.log(`${initialYarnAudits.length - postYarnAudits.length} vulnerabilities automatically resolved`)
  } else if (initialYarnAudits.length === postYarnAudits.length) {
    console.log(`Well, we tried. Try looking at the rest manually.`)
  } else {
    console.log(`Oops. Looks like the new dependencies are even more vulnerable! How did that happen??`)
  }

  if (postYarnAudits.length && !options.major_upgrade && !options.all) {
    console.log('Some vulnerabilities were not fixed by upgrading dependencies. Try updating top level dependents with available fixes.')
  } else if (postYarnAudits.length) {
    console.log('Some vulnerabilities were not fixed by upgrading dependencies. Try looking at the dependent tree, adding a resolution to your package.json is not the best, but it is an option.')
  }

  const postTree = buildTree(initialYarnAudits)
  const postYarnInfo = await getYarnInfo()

  const postViableTree = await fillTreeViability(postTree, postYarnInfo)
  console.log('\nNew Viable Tree:')
  console.log(JSON.stringify(postViableTree, null, 2))
  console.log('Good Luck!')
}

export async function log() {
  const initialYarnAudits = await getYarnAudits()

  const tree = buildTree(initialYarnAudits)
  const yarnInfo = await getYarnInfo()

  const viableTree = await fillTreeViability(tree, yarnInfo)

  console.log(JSON.stringify(viableTree, null, 2))
}
