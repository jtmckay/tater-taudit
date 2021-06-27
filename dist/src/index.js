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
exports.main = void 0;
var yarnAudit_1 = require("./yarnAudit");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var initialYarnAudits, tree, yarnInfo, viableTree, flatTree, sortedFlatTree, upgradeList, upgradeArray, packageName, postYarnAudits, postTree, postYarnInfo, postViableTree;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, yarnAudit_1.getYarnAudits()];
                case 1:
                    initialYarnAudits = _a.sent();
                    tree = yarnAudit_1.buildTree(initialYarnAudits);
                    return [4 /*yield*/, yarnAudit_1.getYarnInfo()
                        // console.log('\nyarnInfo:', JSON.stringify(yarnInfo, null, 2))
                    ];
                case 2:
                    yarnInfo = _a.sent();
                    return [4 /*yield*/, yarnAudit_1.fillTreeViability(tree, yarnInfo)];
                case 3:
                    viableTree = _a.sent();
                    console.log('\nViable Tree:');
                    console.log(JSON.stringify(viableTree, null, 2));
                    flatTree = yarnAudit_1.flattenDependentTree(viableTree);
                    sortedFlatTree = yarnAudit_1.sortFlatDependentTree(flatTree);
                    upgradeList = new Set();
                    sortedFlatTree.filter(function (i) { return i.latestViableVersion || i.version; }).forEach(function (i) { return upgradeList.add(i.name); });
                    upgradeArray = Array.from(upgradeList).reverse();
                    packageName = upgradeArray.pop();
                    _a.label = 4;
                case 4:
                    if (!(upgradeArray.length > 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, yarnAudit_1.execute("yarn upgrade " + packageName + " > testOutput-" + packageName)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    packageName = upgradeArray.pop();
                    return [3 /*break*/, 4];
                case 7: return [4 /*yield*/, yarnAudit_1.getYarnAudits()];
                case 8:
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
                    postTree = yarnAudit_1.buildTree(initialYarnAudits);
                    console.log('\nTree:');
                    console.log(JSON.stringify(postTree, null, 2));
                    return [4 /*yield*/, yarnAudit_1.getYarnInfo()];
                case 9:
                    postYarnInfo = _a.sent();
                    return [4 /*yield*/, yarnAudit_1.fillTreeViability(postTree, postYarnInfo)];
                case 10:
                    postViableTree = _a.sent();
                    console.log('\nNew Viable Tree:');
                    console.log(JSON.stringify(postViableTree, null, 2));
                    console.log('Good Luck!');
                    return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
// main()
