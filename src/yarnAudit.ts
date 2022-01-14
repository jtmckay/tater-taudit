const exec = require('child_process').exec;

const localCache: any = {}

export type CommandOptions = {
  all?: boolean
  dry?: boolean
  major_upgrade?: boolean
  npm?: boolean
  upgrade?: boolean
}

export type YarnAudit = {
  type: string;
  data: {
      resolution: {
          id: number;
          path: string;
          dev: boolean;
          optional: boolean;
          bundled: boolean;
      };
      advisory: {
          findings: {
              version: string;
              paths: string[];
          }[];
          id: number;
          created: string;
          updated: string;
          deleted: null;
          title: string;
          found_by: {
              link: string;
              name: string;
              email: string;
          };
          reported_by: {
              link: string;
              name: string;
              email: string;
          };
          module_name: string;
          cves: string[];
          vulnerable_versions: string;
          patched_versions: string;
          overview: string;
          recommendation: string;
          references: string;
          access: string;
          severity: string;
          cwe: string;
          metadata: {
            module_type: string;
            exploitability: number;
            affected_components: string;
          };
          url: string;
      };
  };
}

export type NpmVersionInfo = {
  _id: string;
  _rev: string;
  name: string;
  description: string;
  "dist-tags": {
      latest: string;
  };
  versions: string[];
  maintainers: string[];
  time: {
      modified: string;
      created: string;
      [key: string]: string;
  };
  homepage: string;
  repository: {
      url: string;
  };
  author: string;
  bugs: {
      url: string;
  };
  license: string;
  readmeFilename: string;
  users: {
      mojaray2k: boolean;
  };
  _cached: boolean;
  _contentLength: number;
  version: string;
  funding: {
      url: string;
  };
  main: string;
  types: string;
  scripts: {
      [key: string]: string;
  };
  devDependencies: {
      [key: string]: string;
  };
  optionalDependencies: {};
  engines: {
      node: string;
  };
  jest: {
      preset: string;
  };
  prettier: {
      tabWidth: number;
  };
  gitHead: string;
  dependencies: {};
  _nodeVersion: string;
  _npmVersion: string;
  dist: {
      [key: string]: string;
  };
  _npmUser: string;
  directories: {};
  _npmOperationalInternal: {
      [key: string]: string;
  };
  _hasShrinkwrap: boolean;
}

export type NpmList = {
  name: string
  version: string
  dependencies: {
    [key: string]: {
      version: string
      resolved: string
    }
  }
}
export interface YarnInfo {
  type: string;
  data: {
    type: string;
    trees?: {
      name: string;
      children?: (YarnInfoChildren | null)[] | null;
      hint?: null;
      color?: string | null;
      depth: number;
    }[] | null;
  };
}

export interface YarnInfoChildren {
  name: string;
  color?: string | null;
  shadow?: boolean | null;
  children?: (YarnInfoChildren | null)[] | null;
  hint?: null;
  depth?: number | null;
}

export type PackageDependency = {
  name: string
  version?: string
  patchedVersions?: string
  severity?: string
  earliestExistingVersion?: string
  minimumViableVersion?: string
  recommendedViableVersion?: string
  latestViableVersion?: string
  dependents: Array<PackageDependency>
}

type PackageInfo = {
  name: string
  version: string
  dependencies: {
    [key: string]: string
  }
}

type WorkspacePackage = {
  name: string
  version: string
  workspace?: string
}

type PackageVersion = [
  string | number,
  string | number,
  string | number
]
export function cleanPackageVersion (version: string): PackageVersion {
  const [a, b, c] = version.replace(/[^0-9.Xx]*/g, '.').split('.').filter(i => i !== '').map(i => {
    const integer = parseInt(i)
    if (isNaN(integer)) {
      return i
    } else {
      return integer
    }
  })
  return [a, b, c]
}

export function isValidVersion (vulnerablePackageVersion?: string, acceptablePackageVersion?: string) {
  if (!vulnerablePackageVersion) return true
  if (!acceptablePackageVersion) return false
  const [vulnerableMajor, vulnerableMinor, vulnerablePatch] = cleanPackageVersion(vulnerablePackageVersion)
  const [acceptableMajor, acceptableMinor, acceptablePatch] = cleanPackageVersion(acceptablePackageVersion)
  if (vulnerableMajor > acceptableMajor) {
    return true
  } else if (vulnerableMajor === acceptableMajor) {
    if (vulnerableMinor === 'x' || vulnerablePackageVersion.includes('^')) {
      return true
    } else if (vulnerableMinor > acceptableMinor) {
      return true
    } else if (vulnerableMinor === acceptableMinor) {
      if (vulnerablePatch === 'x' || vulnerablePatch >= acceptablePatch) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } else {
    return false
  }
}

export async function getYarnAudits(): Promise<Array<YarnAudit>> {
  return execute('yarn audit --json', true, true) as Promise<Array<YarnAudit>>
}

export async function getYarnInfo(): Promise<YarnInfo> {
  return execute('yarn list --json', true) as Promise<YarnInfo>
}

export async function getNpmList(prefix?: string): Promise<NpmList> {
  return execute(`${prefix ? `${prefix} ` : ''}npm list --json`, true) as Promise<NpmList>
}

export async function buildTopLevelPackageList(): Promise<{npmList: NpmList, workspaceList: Array<WorkspacePackage>}> {
  const workspaceList: Array<WorkspacePackage> = []
  const baseNpmList = await getNpmList()
  const npmList = {...baseNpmList}
  await Promise.all(Object.keys(baseNpmList.dependencies).map(async key => {
    const version = baseNpmList.dependencies[key].version
    if (baseNpmList.dependencies[key].resolved?.startsWith('file')) {
      const workspace = baseNpmList.dependencies[key].resolved.replace(/^file:(\.\.\/){0,}/, '')
      const workspaceNpmList = await getNpmList(`cd ${baseNpmList.dependencies[key].resolved.replace(/^file:(\.\.\/){0,}/, '')} &&`)
      Object.keys(workspaceNpmList.dependencies).forEach(workspaceKey => {
        workspaceList.push({ name: workspaceKey, version, workspace })
      })
      delete npmList.dependencies[key]
      Object.assign(npmList, workspaceNpmList)
    } else if (!baseNpmList.dependencies[key].resolved) {
      return
    } else {
      workspaceList.push({ name: key, version })
    }
  }))
  return {
    npmList,
    workspaceList
  }
}

function addDependent (tree: Array<PackageDependency>, npmPackage: PackageDependency, dependents: Array<string>): void {
  let toUpdate = tree.find(i => i.name === npmPackage.name && i.version === npmPackage.version)
  if (!toUpdate) {
    toUpdate = { ...npmPackage }
    tree.push(toUpdate)
  }
  if (dependents.length) {
    const nextDependentsList = [...dependents]
    const nextPackage = { dependents: [], name: nextDependentsList.pop() as string }
    addDependent(toUpdate.dependents, nextPackage, nextDependentsList)
  }
}

export function buildTree (yarnAudits: Array<YarnAudit>): Array<PackageDependency> {
  const tree: Array<PackageDependency> = []
  yarnAudits.forEach((yarnAudit) => {
    if (yarnAudit.type === 'auditAdvisory') {
      const npmPackage: PackageDependency = {
        dependents: [],
        name: yarnAudit.data.advisory.module_name,
        severity: yarnAudit.data.advisory.severity,
        patchedVersions: yarnAudit.data.advisory.patched_versions,
      }
      yarnAudit.data.advisory.findings.forEach((finding) => {
        finding.paths.forEach((path: any) => {
          const dependencyList = path.split('>')
          addDependent(tree, {...npmPackage, version: finding.version}, dependencyList.slice(0, dependencyList.length - 1))
        })
      })
    }
  })
  return tree
}

export async function getNpmPackageInfo (npmPackageName: string, npmPackageVersion?: string): Promise<PackageInfo | undefined> {
  const npmPackageJSON = await execute(`npm view ${npmPackageName}${npmPackageVersion ? `@${npmPackageVersion}` : ''} --json`, true).catch(() => {}) as NpmVersionInfo
  if (!npmPackageJSON) return undefined
  const dependencies = npmPackageJSON.dependencies || {}
  const devDependencies = npmPackageJSON.devDependencies || {}
  return {
    name: npmPackageName,
    version: npmPackageJSON.version,
    dependencies: {...devDependencies, ...dependencies}
  }
}

export async function getVersions (npmPackage: PackageDependency): Promise<string[]> {
  return execute(`npm view ${npmPackage.name} versions --json`, true) as Promise<Array<string>>
}

// For recommended path
export function getVersionSearchTextForLatestSameMajorVersion (npmPackageVersion: string): string {
  const version = npmPackageVersion.replace(/[^0-9.]/g, '')
  const nextVersion = parseInt(version.split('.')[0]) + 1
  return `'>${version} <${nextVersion}'`
}

// validity check must return true if the current and any later items in the array are valid
export async function divideAndConquer<Type> (arrayToCheck: Array<Type>, validityCheck: (version: Type) => Promise<boolean>): Promise<Type | undefined> {
  if (!arrayToCheck.length) {
    return undefined
  } else if (arrayToCheck.length === 1) {
    if (await validityCheck(arrayToCheck[0])) {
      return arrayToCheck[0]
    } else {
      return undefined
    }
  } else {
    const middleishItemIndex = Math.floor((arrayToCheck.length - 1) / 2)
    if (await validityCheck(arrayToCheck[middleishItemIndex])) {
      return divideAndConquer(arrayToCheck.slice(0, middleishItemIndex + 1), validityCheck)
    } else {
      return divideAndConquer(arrayToCheck.slice(middleishItemIndex + 1), validityCheck)
    }
  }
}

function isString(test: number | string) {
  return typeof(test) === 'string'
}

function isNumberStringGreater (first: string | number, second: string | number) {
  if (first === 'x') {
    return true
  }
  const firstArray = Array.from(first.toString())
  const secondArray = Array.from(second.toString())
  const maxLength = Math.max(firstArray.length, secondArray.length)
  const comparableFirst = [new Array(maxLength - firstArray.length).fill('0'), ...firstArray].join('')
  const comparableSecond = [new Array(maxLength - secondArray.length).fill('0'), ...secondArray].join('')
  return comparableFirst > comparableSecond
}

export function isItGreaterOrEqual ([major, minor, patch]: PackageVersion, comparable: PackageVersion): boolean {
  if (!comparable) return true
  const [comparableMajor, comparableMinor, comparablePatch] = comparable

  // Either major is a string and the first is greater, or neither is a string and the first is greater
  if ((((isString(major) || isString(comparableMajor)) && isNumberStringGreater(major, comparableMajor))) || (!isString(major) && !isString(comparableMajor) && major > comparableMajor)) {
    return true
  } else if (major == comparableMajor) {
    // Either minor is a string and the first is greater, or neither is a string and the first is greater
    if (((isString(minor) || isString(comparableMinor)) && isNumberStringGreater(minor, comparableMinor)) || ((!isString(minor) && !isString(comparableMinor)) && minor > comparableMinor)) {
      return true
    } else if (minor == comparableMinor) {
    // Either patch is a string and the first is greater, or neither is a string and the first is greater
    return ((isString(patch) || isString(comparablePatch)) && isNumberStringGreater(patch, comparablePatch)) || ((!isString(patch) && !isString(comparablePatch)) && patch >= comparablePatch)
    }
  }
  return false
}

function getMinimumYarnLockVersion (yarnInfo: YarnInfo, npmPackage: PackageDependency): PackageVersion {
  const currentVersions: Array<string> = []
  yarnInfo.data.trees?.forEach(tree => {
    if (tree.name.startsWith(npmPackage.name)) {
      currentVersions.push(tree.name.replace(`${npmPackage.name}@`, ''))
    }
  })
  return currentVersions.reduce((minimumVersion: any, version: string) => {
    if (!minimumVersion) return cleanPackageVersion(version)
    const newMinimumVersion = cleanPackageVersion(version)
    if (isItGreaterOrEqual(minimumVersion, newMinimumVersion)) {
      return newMinimumVersion
    } else {
      return minimumVersion
    }
  }, undefined)
}

function isValid (packageInfo: PackageInfo, dependencyName: string, minimumViableVersion?: string): boolean {
  let validity = false
  if (packageInfo.name === dependencyName) {
    validity = isValidVersion(packageInfo.version, minimumViableVersion)
  } else {
    if (minimumViableVersion) {
      validity = isValidVersion(packageInfo.dependencies[dependencyName], minimumViableVersion)
    }
    if (!packageInfo.dependencies[dependencyName]) {
      validity = true
    }
  }
  return validity
}

export async function fillViableVersions (npmPackage: PackageDependency, dependency: PackageDependency, yarnInfo: YarnInfo, npmList: NpmList) {
  if (npmPackage.dependents.length === 0 && !npmList.dependencies[npmPackage.name]) return
  let latestViableVersion
  let recommendedViableVersion
  let minimumViableVersion
  const requiredMinimumViableVersion = dependency.patchedVersions || dependency.minimumViableVersion

  const latestNpmPackageDependencies = await getNpmPackageInfo(npmPackage.name)
  if (!latestNpmPackageDependencies) return

  if (isValid(latestNpmPackageDependencies, dependency.name, requiredMinimumViableVersion)) {
    latestViableVersion = latestNpmPackageDependencies.version
    recommendedViableVersion = latestViableVersion
    minimumViableVersion = latestViableVersion

    const versions = await getVersions(npmPackage)
    const minimumVersion = getMinimumYarnLockVersion(yarnInfo, npmPackage)
    if (minimumVersion) {
      npmPackage.earliestExistingVersion = minimumVersion.join('.')
    }
    const versionsGreaterOrEqualToCurrent = versions.filter(i => isItGreaterOrEqual(cleanPackageVersion(i), minimumVersion))
    minimumViableVersion = await divideAndConquer(versionsGreaterOrEqualToCurrent, async version => {
      const packageInfo = await getNpmPackageInfo(npmPackage.name, version)
      if (!packageInfo) return false
      return isValid(packageInfo, dependency.name, requiredMinimumViableVersion)
    })

    if (minimumVersion && minimumViableVersion) {
      const [majorVersion] = minimumVersion
      if (majorVersion && majorVersion >= cleanPackageVersion(minimumViableVersion as string)[0]) {
        const sameMajorVersions = versionsGreaterOrEqualToCurrent.filter(i => {
          return (cleanPackageVersion(i)[0].toString() as string).startsWith((majorVersion as number).toString())
        }).reverse()
        const possibleSameMajorVersion = await divideAndConquer(sameMajorVersions, async version => {
          const packageInfo = await getNpmPackageInfo(npmPackage.name, version)
          if (!packageInfo) return false
          return isValid(packageInfo, dependency.name, requiredMinimumViableVersion)
        })
        if (possibleSameMajorVersion && (cleanPackageVersion(possibleSameMajorVersion)[0] !== cleanPackageVersion(recommendedViableVersion)[0] || isItGreaterOrEqual(cleanPackageVersion(possibleSameMajorVersion), cleanPackageVersion(recommendedViableVersion)))) {
          recommendedViableVersion = possibleSameMajorVersion
        }
      }
    }
  }

  npmPackage.latestViableVersion = latestViableVersion
  npmPackage.recommendedViableVersion = recommendedViableVersion
  npmPackage.minimumViableVersion = minimumViableVersion
  return npmPackage
}

// lowerDependency: meaning lower level dependency, but higher in the reverse tree
export async function fillTreeViability (
  tree: Array<PackageDependency>,
  yarnInfo: YarnInfo,
  npmList: NpmList,
  npmPackageDependent?: PackageDependency,
  lowerDependency?: PackageDependency
  ): Promise<Array<PackageDependency>> {
  if (npmPackageDependent && lowerDependency) {
    await fillViableVersions(npmPackageDependent, lowerDependency, yarnInfo, npmList)
  } else if (npmPackageDependent) {
    await fillViableVersions(npmPackageDependent, npmPackageDependent, yarnInfo, npmList)
  }
  await Promise.all(tree.map(subDependent => fillTreeViability(subDependent.dependents, yarnInfo, npmList, subDependent, npmPackageDependent)))
  return tree
}

export function flattenDependentTree (tree: Array<PackageDependency>, maybeFlatTree?: Array<PackageDependency>) {
  const flatTree = maybeFlatTree ? maybeFlatTree : []

  tree.forEach(npmPackage => {
    if (!flatTree.some(flat => flat.name === npmPackage.name && flat.version === npmPackage.version)) {
      flatTree.push(npmPackage)
      flattenDependentTree(npmPackage.dependents, flatTree)
    }
  })

  return flatTree
}

export function sortFlatDependentTree (tree: Array<PackageDependency>): Array<PackageDependency> {
  return tree.sort((packageA, packageB) => {
    if (packageA.dependents.length === 0 && packageB.dependents.length === 0) {
      return 0
    } else if (packageA.dependents.length === 0) {
      return -1
    } else if (packageB.dependents.length === 0) {
      return 1
    }
    if (packageA.dependents.some(dep => dep.name === packageB.name)) {
      return 1
    }
    return -1
  })
}

export function filterResults (viableTree: PackageDependency[], filter?: string, include?: boolean) {
  if (!filter) {
    return viableTree
  }
  const regex = new RegExp(filter)
  const newTree: PackageDependency[] = []
  viableTree.forEach(branch => {
    let isMatch = regex.test(branch.name)
    const newDependents = filterResults(branch.dependents, filter, include || isMatch)
    if (include || isMatch || newDependents.length) {
      newTree.push({ ...branch, dependents: newDependents })
    }
  })
  return newTree
}

export function filterSeverity (viableTree: PackageDependency[], { critical, low }: { critical?: boolean, low?: boolean }): PackageDependency[] {
  if (!critical && !low) {
    return viableTree
  }
  return viableTree.filter(i => {
    switch (i.severity) {
      case 'critical':
        if (critical) {
          return true
        } else {
          return false
        }
      case 'high':
        if (critical) {
          return true
        } else {
          return false
        }
      case 'moderate':
        if (low) {
          return true
        } else {
          return false
        }
      case 'low':
        if (low) {
          return true
        } else {
          return false
        }
      default:
        return true
    }
  })
}

export async function upgradePackages (commandFunction: Function, npmCommands: boolean, sortedFlatTree: Array<PackageDependency>) {
  const upgradeList = new Set<string>()
  sortedFlatTree.filter(i => i.minimumViableVersion).forEach(i => upgradeList.add(i.name))
  const upgradeArray = Array.from(upgradeList).reverse()
  for (var packageName = upgradeArray.pop(); packageName; packageName = upgradeArray.pop()) {
    const command = npmCommands
    ? `npm update ${packageName}`
    : `yarn upgrade ${packageName}`
    await commandFunction(command)
  }
}

export async function upgradeMajorPackages (commandFunction: Function, npmCommands: boolean, sortedFlatTree: Array<PackageDependency>, workspaceList: Array<WorkspacePackage>) {
  const upgradeList = new Set<string>()
  sortedFlatTree.filter(i => i.minimumViableVersion).forEach(i => upgradeList.add(i.name))
  const upgradeArray = Array.from(upgradeList).reverse()
  
  for (var packageName = upgradeArray.pop(); packageName; packageName = upgradeArray.pop()) {
    const topLevelPackages = workspaceList.filter(i => i.name === packageName)
    if (topLevelPackages.length) {
      await Promise.all(topLevelPackages.map(async topLevelPackage => {
        let npmPackage = sortedFlatTree.find(i => i.name === packageName)
        const command = npmCommands
        ? `npm install ${packageName}@^${(npmPackage?.recommendedViableVersion || npmPackage?.minimumViableVersion as string).replace(/\^/g, '')}`
        : `yarn ${topLevelPackage.workspace ? `workspace ${topLevelPackage.workspace} ` : ''}add ${packageName}@^${(npmPackage?.recommendedViableVersion || npmPackage?.minimumViableVersion as string).replace(/\^/g, '')}${!topLevelPackage.workspace ? ' -W' : ''}`
        await commandFunction(command)
      }))
    }
  }
}

const maxBuffer = 1024 * 1024 * 10

export async function execute(command: string, json = false, jsonLine = false) {
  const useCache = command.startsWith('npm view')
  if (useCache && localCache[command]) {
    return localCache[command]
  }
  const newCommand = new Promise((resolve, reject) => {
    exec(command, { maxBuffer }, function(error: any, stdout: string) {
      // if (stderr) {
      //   console.log('stderr', stderr)
      // }
      // if (error) {
      //   console.log('err', error)
      // }
      let response
      try {
        if (jsonLine) {
            response = stdout.split('\n').filter(i => i !== '').map(i => JSON.parse(i));
        } else {
          if (json) {
            response = JSON.parse(stdout)
          } else {
            response = stdout
          }
        }
      } catch (err) {
        console.log('Failed command:', command)
        if (command.includes('yarn')) {
          console.log('Please make sure yarn is installed')
        }
        return reject(err)
      }
      return resolve(response)
    });
  })
  if (useCache) {
    localCache[command] = newCommand
  }

  return newCommand
};
