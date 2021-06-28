#!/usr/bin/env node
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.main = void 0;
var commander_1 = require("commander");
var yarnAudit_1 = require("./yarnAudit");
var program = new commander_1.Command();
program.description('An application for fixing security vulnerabilities')
    .option('-h, --help', 'Print out command options').addHelpText('after', "\n  Examples:\n    $ tater-audit fix upgrade\n      -- Upgrades all dependents down to the lowest dependency found in the audit with a dependency that has a fix available\n\n    $ tater-audit log\n      -- Creates a tree of all dependents, from the lowest dependency to the highest dependent, found in the audit.\n");
program
    .command('fix')
    .description('Fix audit dependencies')
    .option('-a, --all', 'Run all available fixes automatically')
    .option('-d, --dry', 'Log commands that would effect the repo instead of running them')
    // .option('-d, --dependent_tree <path>', 'Path to the dependent tree (to avoid regenerating)')
    .option('-m, --major_upgrade', 'Attempt to install newer versions (perhaps major; breaking changes)')
    // .option('-t, --test_command <command>', 'Command to run between changes to apply as many fixes as possible without breaking changes')
    .option('-u, --upgrade', 'Upgrade audit dependencies with a fix available')
    .action(function (options) {
    main(options);
}).addHelpText('after', "\n  Examples:\n    $ tater-audit fix -u\n      -- Upgrades all dependents down to the lowest dependency found in the audit with a dependency that has a fix available\n    $ tater-audit fix\n");
program
    .command('log')
    .description('Logs out a tree dependents of any packages identified in the audit')
    .action(function () {
    log();
}).addHelpText('after', "\nExamples:\n  $ tater-audit log\n    -- Creates a tree of all dependents, from the lowest dependency to the highest dependent, found in the audit.\n");
program.parse(process.argv);
function main(options) {
    return __awaiter(this, void 0, void 0, function () {
        var viableTree, initialYarnAudits, workspaceList, tree, yarnInfo, flatTree, sortedFlatTree, upgradeList_1, upgradeArray, packageName, command, tree_1, yarnInfo_1, flatTree, sortedFlatTree, upgradeList_2, upgradeArray, packageName, topLevelPackages, postYarnAudits, postTree, postYarnInfo, postViableTree;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, yarnAudit_1.getYarnAudits()];
                case 1:
                    initialYarnAudits = _a.sent();
                    return [4 /*yield*/, yarnAudit_1.buildTopLevelPackageList()];
                case 2:
                    workspaceList = (_a.sent()).workspaceList;
                    tree = yarnAudit_1.buildTree(initialYarnAudits);
                    return [4 /*yield*/, yarnAudit_1.getYarnInfo()];
                case 3:
                    yarnInfo = _a.sent();
                    return [4 /*yield*/, yarnAudit_1.fillTreeViability(tree, yarnInfo)];
                case 4:
                    viableTree = _a.sent();
                    if (!(options.all || options.upgrade)) return [3 /*break*/, 9];
                    flatTree = yarnAudit_1.flattenDependentTree(viableTree);
                    sortedFlatTree = yarnAudit_1.sortFlatDependentTree(flatTree);
                    upgradeList_1 = new Set();
                    sortedFlatTree.filter(function (i) { return i.latestViableVersion || i.version; }).forEach(function (i) { return upgradeList_1.add(i.name); });
                    upgradeArray = Array.from(upgradeList_1).reverse();
                    packageName = upgradeArray.pop();
                    _a.label = 5;
                case 5:
                    if (!(upgradeArray.length > 0)) return [3 /*break*/, 9];
                    command = "yarn upgrade " + packageName;
                    if (!options.dry) return [3 /*break*/, 6];
                    console.log(command);
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, yarnAudit_1.execute(command)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    packageName = upgradeArray.pop();
                    return [3 /*break*/, 5];
                case 9:
                    if (!(options.all || options.major_upgrade)) return [3 /*break*/, 16];
                    if (!(options.all || options.upgrade)) return [3 /*break*/, 12];
                    tree_1 = yarnAudit_1.buildTree(initialYarnAudits);
                    return [4 /*yield*/, yarnAudit_1.getYarnInfo()];
                case 10:
                    yarnInfo_1 = _a.sent();
                    return [4 /*yield*/, yarnAudit_1.fillTreeViability(tree_1, yarnInfo_1)];
                case 11:
                    viableTree = _a.sent();
                    _a.label = 12;
                case 12:
                    flatTree = yarnAudit_1.flattenDependentTree(viableTree);
                    sortedFlatTree = yarnAudit_1.sortFlatDependentTree(flatTree);
                    upgradeList_2 = new Set();
                    sortedFlatTree.filter(function (i) { return i.latestViableVersion || i.version; }).forEach(function (i) { return upgradeList_2.add(i.name); });
                    upgradeArray = Array.from(upgradeList_2).reverse();
                    packageName = upgradeArray.pop();
                    _a.label = 13;
                case 13:
                    if (!(upgradeArray.length > 0)) return [3 /*break*/, 16];
                    topLevelPackages = workspaceList.filter(function (i) { return i.name === packageName; });
                    if (!topLevelPackages.length) return [3 /*break*/, 15];
                    return [4 /*yield*/, Promise.all(topLevelPackages.map(function (topLevelPackage) {
                            var command = "yarn " + (topLevelPackage.workspace ? "workspace " + topLevelPackage.workspace + " " : '') + "add " + packageName + (!topLevelPackage.workspace ? ' --ignore-workspace-root-check' : '');
                            if (options.dry) {
                                console.log(command);
                            }
                            else {
                                yarnAudit_1.execute(command);
                            }
                        }))];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15:
                    packageName = upgradeArray.pop();
                    return [3 /*break*/, 13];
                case 16:
                    if (!!options.dry) return [3 /*break*/, 20];
                    return [4 /*yield*/, yarnAudit_1.getYarnAudits()];
                case 17:
                    postYarnAudits = _a.sent();
                    console.log("Initial audits: " + initialYarnAudits.length + ". Post upgrades: " + postYarnAudits.length + ".");
                    if (initialYarnAudits.length > postYarnAudits.length) {
                        console.log(initialYarnAudits.length - postYarnAudits.length + " vulnerabilities automatically resolved");
                    }
                    else if (initialYarnAudits.length === postYarnAudits.length) {
                        console.log("Well, we tried. Try looking at the rest manually.");
                    }
                    else {
                        console.log("Oops. Looks like the new dependencies are even more vulnerable! How did that happen??");
                    }
                    if (postYarnAudits.length && !options.major_upgrade && !options.all) {
                        console.log('Some vulnerabilities were not fixed by upgrading dependencies. Try updating top level dependents with available fixes.');
                    }
                    else if (postYarnAudits.length) {
                        console.log('Some vulnerabilities were not fixed by upgrading dependencies. Try looking at the dependent tree, adding a resolution to your package.json is not the best, but it is an option.');
                    }
                    postTree = yarnAudit_1.buildTree(initialYarnAudits);
                    return [4 /*yield*/, yarnAudit_1.getYarnInfo()];
                case 18:
                    postYarnInfo = _a.sent();
                    return [4 /*yield*/, yarnAudit_1.fillTreeViability(postTree, postYarnInfo)];
                case 19:
                    postViableTree = _a.sent();
                    console.log('\nNew Viable Tree:');
                    console.log(JSON.stringify(postViableTree, null, 2));
                    console.log('Good Luck!');
                    _a.label = 20;
                case 20: return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
function log() {
    return __awaiter(this, void 0, void 0, function () {
        var initialYarnAudits, tree, yarnInfo, viableTree;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, yarnAudit_1.getYarnAudits()];
                case 1:
                    initialYarnAudits = _a.sent();
                    tree = yarnAudit_1.buildTree(initialYarnAudits);
                    return [4 /*yield*/, yarnAudit_1.getYarnInfo()];
                case 2:
                    yarnInfo = _a.sent();
                    return [4 /*yield*/, yarnAudit_1.fillTreeViability(tree, yarnInfo)];
                case 3:
                    viableTree = _a.sent();
                    console.log(JSON.stringify(viableTree, null, 2));
                    return [2 /*return*/];
            }
        });
    });
}
exports.log = log;
