"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.sortFlatDependentTree = exports.flattenDependentTree = exports.fillTreeViability = exports.fillViableVersions = exports.isItGreaterOrEqual = exports.divideAndConquer = exports.getVersionSearchTextForLatestSameMajorVersion = exports.getVersions = exports.getNpmPackageInfo = exports.buildTree = exports.getYarnInfo = exports.getYarnAudits = exports.isValidVersion = void 0;
var exec = require('child_process').exec;
var localCache = {};
function cleanPackageVersion(version) {
    var _a = version.replace(/[^0-9.Xx]*/g, '.').split('.').filter(function (i) { return i !== ''; }).map(function (i) {
        var integer = parseInt(i);
        if (isNaN(integer)) {
            return i;
        }
        else {
            return integer;
        }
    }), a = _a[0], b = _a[1], c = _a[2];
    return [a, b, c];
}
function isValidVersion(vulnerablePackageVersion, acceptablePackageVersion) {
    if (!vulnerablePackageVersion)
        return true;
    var _a = cleanPackageVersion(vulnerablePackageVersion), vulnerableMajor = _a[0], vulnerableMinor = _a[1], vulnerablePatch = _a[2];
    var _b = cleanPackageVersion(acceptablePackageVersion), acceptableMajor = _b[0], acceptableMinor = _b[1], acceptablePatch = _b[2];
    if (vulnerableMajor > acceptableMajor) {
        return true;
    }
    else if (vulnerableMajor === acceptableMajor) {
        if (vulnerableMinor === 'x' || vulnerablePackageVersion.includes('^')) {
            return true;
        }
        else if (vulnerableMinor > acceptableMinor) {
            return true;
        }
        else if (vulnerableMinor === acceptableMinor) {
            if (vulnerablePatch === 'x' || vulnerablePatch >= acceptablePatch) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}
exports.isValidVersion = isValidVersion;
function getYarnAudits() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, execute('yarn audit --json', true, true)];
        });
    });
}
exports.getYarnAudits = getYarnAudits;
function getYarnInfo() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, execute('yarn list --json', true)];
        });
    });
}
exports.getYarnInfo = getYarnInfo;
// export function getYarnInfoPackages (yarnInfo: YarnInfo): Array<string> {
//   const packages = new Set<string>()
//   yarnInfo.data.trees?.forEach(tree => {
//     const packageNameSplit = tree.name.split('@')
//     packages.add(packageNameSplit.slice(0, packageNameSplit.length - 1).join('@'))
//   })
//   return Array.from(packages)
// }
function addDependent(tree, npmPackage, dependents) {
    var toUpdate = tree.find(function (i) { return i.name === npmPackage.name && i.version === npmPackage.version; });
    if (!toUpdate) {
        toUpdate = __assign({}, npmPackage);
        tree.push(toUpdate);
    }
    if (dependents.length) {
        var nextDependentsList = __spreadArray([], dependents);
        var nextPackage = { name: nextDependentsList.pop(), dependents: [] };
        addDependent(toUpdate.dependents, nextPackage, nextDependentsList);
    }
}
function buildTree(yarnAudits) {
    var tree = [];
    yarnAudits.forEach(function (yarnAudit) {
        if (yarnAudit.type === 'auditAdvisory') {
            var npmPackage_1 = { name: yarnAudit.data.advisory.module_name, patchedVersions: yarnAudit.data.advisory.patched_versions, dependents: [] };
            yarnAudit.data.advisory.findings.forEach(function (finding) {
                finding.paths.forEach(function (path) {
                    var dependencyList = path.split('>');
                    addDependent(tree, __assign(__assign({}, npmPackage_1), { version: finding.version }), dependencyList.slice(0, dependencyList.length - 1));
                });
            });
        }
    });
    return tree;
}
exports.buildTree = buildTree;
// export function getFlatListOfVulnerabilities (yarnAudits: Array<YarnAudit>): Array<string> {
//   const vulnerabilities = new Set<string>()
//   yarnAudits.forEach(yarnAudit => {
//     if (yarnAudit.type === 'auditAdvisory') {
//       yarnAudit.data.advisory.findings.forEach((finding) => {
//         vulnerabilities.add(`${yarnAudit.data.advisory.module_name}@${finding.version}`)
//       })
//     }
//   })
//   return Array.from(vulnerabilities)
// }
// function addDependent (tree: Array<PackageDependency>, npmPackage: PackageDependency, dependents: Array<PackageDependency>): void {
//   let toUpdate = tree.find(i => i.name === npmPackage.name && i.version === npmPackage.version)
//   if (!toUpdate) {
//     toUpdate = { ...npmPackage }
//     tree.push(toUpdate)
//   }
//   if (dependents.length) {
//     const nextDependentsList = [...dependents]
//     const nextPackage = nextDependentsList.pop()
//     if (!nextPackage) throw new Error('Missing next package')
//     addDependent(toUpdate.dependents, nextPackage, nextDependentsList)
//   }
// }
// export function buildTree (yarnChildren: Array<YarnInfoChildren>, vulnerabilities: Array<string>, dependents: Array<PackageDependency>) {
//   const tree: Array<PackageDependency> = []
//   yarnChildren.forEach(child => {
//     const npmPackage = {}
//     // Needs to cover imperfect matches
//     if (vulnerabilities.includes(child.name)) {
//       addDependent()
//     }
//   })
//   return tree
// }
function getNpmPackageInfo(npmPackageName, npmPackageVersion) {
    return __awaiter(this, void 0, void 0, function () {
        var npmPackageJSON, dependencies, devDependencies;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, execute("npm view " + npmPackageName + (npmPackageVersion ? "@" + npmPackageVersion : '') + " --json", true).catch(function () { })];
                case 1:
                    npmPackageJSON = _a.sent();
                    if (!npmPackageJSON)
                        return [2 /*return*/, undefined];
                    dependencies = npmPackageJSON.dependencies || {};
                    devDependencies = npmPackageJSON.devDependencies || {};
                    return [2 /*return*/, {
                            name: npmPackageName,
                            version: npmPackageJSON.version,
                            dependencies: __assign(__assign({}, devDependencies), dependencies)
                        }];
            }
        });
    });
}
exports.getNpmPackageInfo = getNpmPackageInfo;
function getVersions(npmPackage) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, execute("npm view " + npmPackage.name + " versions --json", true)];
        });
    });
}
exports.getVersions = getVersions;
// For recommended path
function getVersionSearchTextForLatestSameMajorVersion(npmPackageVersion) {
    var version = npmPackageVersion.replace(/[^0-9.]/g, '');
    var nextVersion = parseInt(version.split('.')[0]) + 1;
    return "'>" + version + " <" + nextVersion + "'";
}
exports.getVersionSearchTextForLatestSameMajorVersion = getVersionSearchTextForLatestSameMajorVersion;
// validity check must return true if the current and any later items in the array are valid
function divideAndConquer(arrayToCheck, validityCheck) {
    return __awaiter(this, void 0, void 0, function () {
        var middleishItemIndex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!arrayToCheck.length) return [3 /*break*/, 1];
                    return [2 /*return*/, undefined];
                case 1:
                    if (!(arrayToCheck.length === 1)) return [3 /*break*/, 3];
                    return [4 /*yield*/, validityCheck(arrayToCheck[0])];
                case 2:
                    if (_a.sent()) {
                        return [2 /*return*/, arrayToCheck[0]];
                    }
                    else {
                        return [2 /*return*/, undefined];
                    }
                    return [3 /*break*/, 5];
                case 3:
                    middleishItemIndex = Math.floor((arrayToCheck.length - 1) / 2);
                    return [4 /*yield*/, validityCheck(arrayToCheck[middleishItemIndex])];
                case 4:
                    if (_a.sent()) {
                        return [2 /*return*/, divideAndConquer(arrayToCheck.slice(0, middleishItemIndex + 1), validityCheck)];
                    }
                    else {
                        return [2 /*return*/, divideAndConquer(arrayToCheck.slice(middleishItemIndex + 1), validityCheck)];
                    }
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.divideAndConquer = divideAndConquer;
function isString(test) {
    return typeof (test) === 'string';
}
function isItGreaterOrEqual(_a, comparable) {
    var major = _a[0], minor = _a[1], patch = _a[2];
    if (!comparable)
        return true;
    var comparableMajor = comparable[0], comparableMinor = comparable[1], comparablePatch = comparable[2];
    if (isString(major))
        return true;
    if (major > comparableMajor) {
        return true;
    }
    else if (major === comparableMajor) {
        if (isString(minor))
            return true;
        if (minor > comparableMinor) {
            return true;
        }
        else if (minor === comparableMinor) {
            if (isString(patch))
                return true;
            return patch >= comparablePatch;
        }
    }
    return false;
}
exports.isItGreaterOrEqual = isItGreaterOrEqual;
function getMinimumYarnLockVersion(yarnInfo, npmPackage) {
    var _a;
    var currentVersions = [];
    (_a = yarnInfo.data.trees) === null || _a === void 0 ? void 0 : _a.forEach(function (tree) {
        if (tree.name.startsWith(npmPackage.name)) {
            currentVersions.push(tree.name.replace(npmPackage.name + "@", ''));
        }
    });
    return currentVersions.reduce(function (minimumVersion, version) {
        if (!minimumVersion)
            return cleanPackageVersion(version);
        var newMinimumVersion = cleanPackageVersion(version);
        if (isItGreaterOrEqual(minimumVersion, newMinimumVersion)) {
            return newMinimumVersion;
        }
        else {
            return minimumVersion;
        }
    }, undefined);
}
function fillViableVersions(npmPackage, dependency, yarnInfo) {
    return __awaiter(this, void 0, void 0, function () {
        var latestViableVersion, recommendedViableVersion, earliestViableVersion, requiredMinimumViableVersion, latestNpmPackageDependencies, latestNpmPackageDependencyVersion, versions, minimumVersion_1, versionsGreaterOrEqualToCurrent, majorVersion_1, sameMajorVersions, possibleSameMajorVersion;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    requiredMinimumViableVersion = dependency.patchedVersions || dependency.earliestViableVersion;
                    return [4 /*yield*/, getNpmPackageInfo(npmPackage.name)];
                case 1:
                    latestNpmPackageDependencies = _a.sent();
                    if (!latestNpmPackageDependencies)
                        return [2 /*return*/];
                    latestNpmPackageDependencyVersion = latestNpmPackageDependencies.dependencies[dependency.name];
                    if (!requiredMinimumViableVersion)
                        return [2 /*return*/];
                    if (!isValidVersion(latestNpmPackageDependencyVersion, requiredMinimumViableVersion)) return [3 /*break*/, 5];
                    latestViableVersion = latestNpmPackageDependencies.version;
                    recommendedViableVersion = latestViableVersion;
                    earliestViableVersion = latestViableVersion;
                    return [4 /*yield*/, getVersions(npmPackage)];
                case 2:
                    versions = _a.sent();
                    minimumVersion_1 = getMinimumYarnLockVersion(yarnInfo, npmPackage);
                    if (minimumVersion_1) {
                        npmPackage.earliestExistingVersion = minimumVersion_1.join('.');
                    }
                    versionsGreaterOrEqualToCurrent = versions.filter(function (i) { return isItGreaterOrEqual(cleanPackageVersion(i), minimumVersion_1); });
                    return [4 /*yield*/, divideAndConquer(versionsGreaterOrEqualToCurrent, function (version) { return __awaiter(_this, void 0, void 0, function () {
                            var packageInfo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, getNpmPackageInfo(npmPackage.name, version)];
                                    case 1:
                                        packageInfo = _a.sent();
                                        if (!packageInfo)
                                            return [2 /*return*/, false];
                                        return [2 /*return*/, isValidVersion(packageInfo.dependencies[dependency.name], requiredMinimumViableVersion)];
                                }
                            });
                        }); })];
                case 3:
                    earliestViableVersion = _a.sent();
                    if (!(minimumVersion_1 && earliestViableVersion)) return [3 /*break*/, 5];
                    majorVersion_1 = minimumVersion_1[0];
                    if (!(majorVersion_1 && majorVersion_1 >= cleanPackageVersion(earliestViableVersion)[0])) return [3 /*break*/, 5];
                    sameMajorVersions = versionsGreaterOrEqualToCurrent.filter(function (i) {
                        return cleanPackageVersion(i)[0].toString().startsWith(majorVersion_1.toString());
                    }).reverse();
                    return [4 /*yield*/, divideAndConquer(sameMajorVersions, function (version) { return __awaiter(_this, void 0, void 0, function () {
                            var packageInfo;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, getNpmPackageInfo(npmPackage.name, version)];
                                    case 1:
                                        packageInfo = _a.sent();
                                        if (!packageInfo)
                                            return [2 /*return*/, false];
                                        return [2 /*return*/, isValidVersion(packageInfo.dependencies[dependency.name], requiredMinimumViableVersion)];
                                }
                            });
                        }); })];
                case 4:
                    possibleSameMajorVersion = _a.sent();
                    if (possibleSameMajorVersion) {
                        recommendedViableVersion = possibleSameMajorVersion;
                    }
                    _a.label = 5;
                case 5:
                    npmPackage.latestViableVersion = latestViableVersion;
                    npmPackage.recommendedViableVersion = recommendedViableVersion;
                    npmPackage.earliestViableVersion = earliestViableVersion;
                    return [2 /*return*/, npmPackage];
            }
        });
    });
}
exports.fillViableVersions = fillViableVersions;
// lowerDependency: meaning lower level dependency, but higher in the reverse tree
function fillTreeViability(tree, yarnInfo, npmPackageDependent, lowerDependency) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(npmPackageDependent && lowerDependency)) return [3 /*break*/, 2];
                    return [4 /*yield*/, fillViableVersions(npmPackageDependent, lowerDependency, yarnInfo)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [4 /*yield*/, Promise.all(tree.map(function (subDependent) { return fillTreeViability(subDependent.dependents, yarnInfo, subDependent, npmPackageDependent); }))];
                case 3:
                    _a.sent();
                    return [2 /*return*/, tree];
            }
        });
    });
}
exports.fillTreeViability = fillTreeViability;
function flattenDependentTree(tree, maybeFlatTree) {
    var flatTree = maybeFlatTree ? maybeFlatTree : [];
    tree.forEach(function (npmPackage) {
        if (!flatTree.some(function (flat) { return flat.name === npmPackage.name && flat.version === npmPackage.version; })) {
            flatTree.push(npmPackage);
            flattenDependentTree(npmPackage.dependents, flatTree);
        }
    });
    return flatTree;
}
exports.flattenDependentTree = flattenDependentTree;
function sortFlatDependentTree(tree) {
    return tree.sort(function (packageA, packageB) {
        if (packageA.dependents.length === 0 && packageB.dependents.length === 0) {
            return 0;
        }
        else if (packageA.dependents.length === 0) {
            return -1;
        }
        else if (packageB.dependents.length === 0) {
            return 1;
        }
        if (packageA.dependents.some(function (dep) { return dep.name === packageB.name; })) {
            return 1;
        }
        return -1;
    });
}
exports.sortFlatDependentTree = sortFlatDependentTree;
// traverseForPackageUpdate(expandedTree, 'redis', '>=3.1.1', '@pluralsight/ps-redis-node')
function execute(command, json, jsonLine) {
    if (json === void 0) { json = false; }
    if (jsonLine === void 0) { jsonLine = false; }
    return __awaiter(this, void 0, void 0, function () {
        var useCache, newCommand;
        return __generator(this, function (_a) {
            useCache = command.startsWith('npm view');
            if (useCache && localCache[command]) {
                return [2 /*return*/, localCache[command]];
            }
            newCommand = new Promise(function (resolve, reject) {
                exec(command, function (error, stdout) {
                    // if (stderr) {
                    //   console.log('stderr', stderr)
                    // }
                    // if (error) {
                    //   console.log('err', error)
                    // }
                    var response;
                    try {
                        if (jsonLine) {
                            response = stdout.split('\n').filter(function (i) { return i !== ''; }).map(function (i) { return JSON.parse(i); });
                        }
                        else {
                            if (json) {
                                response = JSON.parse(stdout);
                            }
                            else {
                                response = stdout;
                            }
                        }
                    }
                    catch (err) {
                        console.log('Failed command:', command);
                        return reject(err);
                    }
                    return resolve(response);
                });
            });
            if (useCache) {
                localCache[command] = newCommand;
            }
            return [2 /*return*/, newCommand
                // return retry(() => {
                // }, 5, 50)
            ];
        });
    });
}
exports.execute = execute;
;
// async function retry (theThing: Function, retryLimit: number, delay: number): Promise<any> {
//   let response
//   try {
//     response = await theThing()
//   } catch (err) {
//     if (retryLimit > 0) {
//       response = await retry(theThing, retryLimit - 1, delay * 2)
//     } else {
//       throw new Error(`No more retries ${JSON.stringify(err)}`)
//     }
//   }
//   return response
// }