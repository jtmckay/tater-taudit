import { buildTree, execute, fillTreeViability, flattenDependentTree, getYarnAudits, getYarnInfo, sortFlatDependentTree } from "./yarnAudit"

export async function main() {

  const initialYarnAudits = await getYarnAudits()

  const tree = buildTree(initialYarnAudits)
  // console.log('\nTree:')
  // console.log(JSON.stringify(tree, null, 2))

  const yarnInfo = await getYarnInfo()
  // console.log('\nyarnInfo:', JSON.stringify(yarnInfo, null, 2))

  const viableTree = await fillTreeViability(tree, yarnInfo)
  console.log('\nViable Tree:')
  console.log(JSON.stringify(viableTree, null, 2))

  const flatTree = flattenDependentTree(viableTree)
  const sortedFlatTree = sortFlatDependentTree(flatTree)
  // console.log('Flat tree to patch:')
  // console.log(JSON.stringify(sortedFlatTree, null, 2))

  // console.log('Flat tree strings to patch:')
  const upgradeList = new Set<string>()
  sortedFlatTree.filter(i => i.latestViableVersion || i.version).forEach(i => upgradeList.add(i.name))
  const upgradeArray = Array.from(upgradeList).reverse()
  // console.log(JSON.stringify(upgradeArray, null, 2))
  for (var packageName = upgradeArray.pop(); upgradeArray.length > 0; packageName = upgradeArray.pop()) {
    await execute(`yarn upgrade ${packageName} > testOutput-${packageName}`)
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

  const postTree = buildTree(initialYarnAudits)
  console.log('\nTree:')
  console.log(JSON.stringify(postTree, null, 2))

  const postYarnInfo = await getYarnInfo()

  const postViableTree = await fillTreeViability(postTree, postYarnInfo)
  console.log('\nNew Viable Tree:')
  console.log(JSON.stringify(postViableTree, null, 2))
  console.log('Good Luck!')
}

// main()