const exec = require('child_process').exec;

const localCache: any = {}

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
  earliestExistingVersion?: string
  leastViableVersion?: string
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
  workspace?: string
}

type PackageVersion = [
  string | number,
  string | number,
  string | number
]
function cleanPackageVersion (version: string): PackageVersion {
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

export function isValidVersion (vulnerablePackageVersion: string, acceptablePackageVersion: string) {
  if (!vulnerablePackageVersion) return true
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
  const npmList = {...baseNpmList}
  await Promise.all(Object.keys(baseNpmList.dependencies).map(async key => {
    if (baseNpmList.dependencies[key].resolved?.startsWith('file')) {
      const workspace = baseNpmList.dependencies[key].resolved.replace(/^file:\.\.\//, '')
      const workspaceNpmList = await getNpmList(`cd ${baseNpmList.dependencies[key].resolved.replace(/^file:\./, '')} &&`)
      Object.keys(workspaceNpmList.dependencies).forEach(workspaceKey => {
        workspaceList.push({ name: workspaceKey, workspace })
      })
      delete npmList.dependencies[key]
      Object.assign(npmList, workspaceNpmList)
    } else if (!baseNpmList.dependencies[key].resolved) {
      return
    } else {
      workspaceList.push({ name: key })
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
    const nextPackage = { name: nextDependentsList.pop() as string, dependents: [] }
    addDependent(toUpdate.dependents, nextPackage, nextDependentsList)
  }
}

export function buildTree (yarnAudits: Array<YarnAudit>): Array<PackageDependency> {
  const tree: Array<PackageDependency> = []
  yarnAudits.forEach((yarnAudit) => {
    if (yarnAudit.type === 'auditAdvisory') {
      const npmPackage: PackageDependency = { name: yarnAudit.data.advisory.module_name, patchedVersions: yarnAudit.data.advisory.patched_versions, dependents: [] }
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

export function isItGreaterOrEqual ([major, minor, patch]: PackageVersion, comparable: PackageVersion): boolean {
  if (!comparable) return true
  const [comparableMajor, comparableMinor, comparablePatch] = comparable

  if (isString(major)) return true

  if (major > comparableMajor) {
    return true
  } else if (major === comparableMajor) {
    if (isString(minor)) return true

    if (minor > comparableMinor) {
      return true
    } else if (minor === comparableMinor) {
      if (isString(patch)) return true

      return patch >= comparablePatch
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

export async function fillViableVersions (npmPackage: PackageDependency, dependency: PackageDependency, yarnInfo: YarnInfo) {
  let latestViableVersion
  let recommendedViableVersion
  let leastViableVersion
  const requiredMinimumViableVersion = dependency.patchedVersions || dependency.leastViableVersion

  const latestNpmPackageDependencies = await getNpmPackageInfo(npmPackage.name)
  if (!latestNpmPackageDependencies) return

  const latestNpmPackageDependencyVersion = latestNpmPackageDependencies.dependencies[dependency.name]
  if (!requiredMinimumViableVersion) return

  if (isValidVersion(latestNpmPackageDependencyVersion, requiredMinimumViableVersion)) {
    latestViableVersion = latestNpmPackageDependencies.version
    recommendedViableVersion = latestViableVersion
    leastViableVersion = latestViableVersion

    const versions = await getVersions(npmPackage)
    const minimumVersion = getMinimumYarnLockVersion(yarnInfo, npmPackage)
    if (minimumVersion) {
      npmPackage.earliestExistingVersion = minimumVersion.join('.')
    }
    const versionsGreaterOrEqualToCurrent = versions.filter(i => isItGreaterOrEqual(cleanPackageVersion(i), minimumVersion))
    leastViableVersion = await divideAndConquer(versionsGreaterOrEqualToCurrent, async version => {
      const packageInfo = await getNpmPackageInfo(npmPackage.name, version)
      if (!packageInfo) return false
      return isValidVersion(packageInfo.dependencies[dependency.name], requiredMinimumViableVersion)
    })

    if (minimumVersion && leastViableVersion) {
      const [majorVersion] = minimumVersion
      if (majorVersion && majorVersion >= cleanPackageVersion(leastViableVersion as string)[0]) {
        const sameMajorVersions = versionsGreaterOrEqualToCurrent.filter(i => {
          return (cleanPackageVersion(i)[0].toString() as string).startsWith((majorVersion as number).toString())
        }).reverse()
        const possibleSameMajorVersion = await divideAndConquer(sameMajorVersions, async version => {
          const packageInfo = await getNpmPackageInfo(npmPackage.name, version)
          if (!packageInfo) return false
          return isValidVersion(packageInfo.dependencies[dependency.name], requiredMinimumViableVersion)
        })
        if (possibleSameMajorVersion) {
          recommendedViableVersion = possibleSameMajorVersion
        }
      }
    }
  }

  npmPackage.latestViableVersion = latestViableVersion
  npmPackage.recommendedViableVersion = recommendedViableVersion
  npmPackage.leastViableVersion = leastViableVersion
  return npmPackage
}

// lowerDependency: meaning lower level dependency, but higher in the reverse tree
export async function fillTreeViability (tree: Array<PackageDependency>, yarnInfo: YarnInfo, npmPackageDependent?: PackageDependency, lowerDependency?: PackageDependency): Promise<Array<PackageDependency>> {
  if (npmPackageDependent && lowerDependency) {
    await fillViableVersions(npmPackageDependent, lowerDependency, yarnInfo)
  }
  await Promise.all(tree.map(subDependent => fillTreeViability(subDependent.dependents, yarnInfo, subDependent, npmPackageDependent)))
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

export async function execute(command: string, json = false, jsonLine = false) {
  const useCache = command.startsWith('npm view')
  if (useCache && localCache[command]) {
    return localCache[command]
  }
  const newCommand = new Promise((resolve, reject) => {
    exec(command, function(error: any, stdout: string) {
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
