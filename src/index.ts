#!/usr/bin/env node

import { Command } from 'commander'
import {
  CommandOptions,
  buildTopLevelPackageList,
  buildTree,
  execute,
  fillTreeViability,
  flattenDependentTree,
  getYarnAudits,
  getYarnInfo,
  sortFlatDependentTree,
  upgradePackages,
  upgradeMajorPackages
} from "./yarnAudit"

const program = new Command();

program.description('An application for fixing security vulnerabilities')
.version('0.1.4')
.option('-h, --help', 'Print out command options').addHelpText('after', `
  Examples:
    $ tater-taudit fix
      -- Upgrades all dependents down to the lowest dependency found in the audit with a dependency that has a fix available.

    $ tater-taudit log
      -- Creates a tree of all dependents, from the lowest dependency to the highest dependent, found in the audit.
`);

program
  .command('fix')
  .description('Fix audit dependencies')
  .option('-a, --all', 'Run all available fixes automatically')
  .option('-d, --dry', 'Log commands that would effect the repo instead of running them')
  // .option('-d, --dependent_tree <path>', 'Path to the dependent tree (to avoid regenerating)')
  .option('-m, --major_upgrade', 'Attempt to install newer versions (perhaps major; breaking changes)')
  .option('-n, --npm', 'Replace yarn with npm in output commands')
  // .option('-t, --test_command <command>', 'Command to run between changes to apply as many fixes as possible without breaking changes')
  .option('-u, --upgrade', 'Upgrade audit dependencies with a fix available')
  .action((options: CommandOptions) => {
    main(options)
  }).addHelpText('after', `
  Examples:
    $ tater-taudit fix
      -- Runs all available fixes but only logs the commands that would be run
    $ tater-taudit fix -a
      -- Runs all available fixes
    $ tater-taudit fix -d
      -- Only logs the commands that would be run
    $ tater-taudit fix -u
      -- Upgrades all dependents down to the lowest dependency found in the audit with a dependency that has a fix available
    $ tater-taudit fix -m
      -- Upgrades all top level dependencies with a fix available that is not permitted by the current locked version
`);

program
  .command('log')
  .description('Logs out a tree dependents of any packages identified in the audit')
  .action(() => {
    log()
  }).addHelpText('after', `
Examples:
  $ tater-taudit log
    -- Creates a tree of all dependents, from the lowest dependency to the highest dependent, found in the audit.
`);

program.parse(process.argv);

export async function main(options: CommandOptions) {
  if (!options.upgrade && !options.major_upgrade && !options.all) {
    options.all = true
    options.dry = true
    console.log('Try running `tater-taudit help fix` for more options. Defaulting to "all" and "dry"')
  }
  let viableTree
  const initialYarnAudits = await getYarnAudits()
  const {npmList, workspaceList} = await buildTopLevelPackageList()

  const tree = buildTree(initialYarnAudits)
  const yarnInfo = await getYarnInfo()

  viableTree = await fillTreeViability(tree, yarnInfo, npmList)

  if (options.all || options.upgrade) {
    const flatTree = flattenDependentTree(viableTree)
    const sortedFlatTree = sortFlatDependentTree(flatTree)

    await upgradePackages(options.dry ? console.log : (command: string) => {
      console.log(`Running "${command}" in child process`)
      execute(command)
    }, options.npm || false, sortedFlatTree)
  }

  if (options.all || options.major_upgrade) {
    if (options.all || options.upgrade) {
      const tree = buildTree(initialYarnAudits)
      const yarnInfo = await getYarnInfo()
      viableTree = await fillTreeViability(tree, yarnInfo, npmList)
    }
    const flatTree = flattenDependentTree(viableTree)
    const sortedFlatTree = sortFlatDependentTree(flatTree)

    await upgradeMajorPackages(options.dry ? console.log : (command: string) => {
      console.log(`Running "${command}" in child process`)
      execute(command)
    }, options.npm || false, sortedFlatTree, workspaceList)
  }
  
  if (!options.dry) {
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
  
    const postViableTree = await fillTreeViability(postTree, postYarnInfo, npmList)
    console.log('\nNew Viable Tree:')
    console.log(JSON.stringify(postViableTree, null, 2))
    console.log('Good Luck!')
  }
}

export async function log() {
  const initialYarnAudits = await getYarnAudits()
  const {npmList} = await buildTopLevelPackageList()

  const tree = buildTree(initialYarnAudits)
  const yarnInfo = await getYarnInfo()

  const viableTree = await fillTreeViability(tree, yarnInfo, npmList)

  console.log(JSON.stringify(viableTree, null, 2))
}
