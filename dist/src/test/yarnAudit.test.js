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
var yarnAudit_1 = require("../yarnAudit");
var testData_1 = require("./testData");
describe('isValidVersion', function () {
    describe('when given a major version higher than acceptable', function () {
        it('returns true', function () { return expect(yarnAudit_1.isValidVersion('1.0.0', '0.0.0')).toBe(true); });
    });
    describe('when given a minor version higher than acceptable', function () {
        it('returns true', function () { return expect(yarnAudit_1.isValidVersion('0.1.0', '0.0.0')).toBe(true); });
    });
    describe('when given a patch version higher than acceptable', function () {
        it('returns true', function () { return expect(yarnAudit_1.isValidVersion('0.0.1', '0.0.0')).toBe(true); });
    });
    describe('when given the same acceptable version', function () {
        it('returns true', function () { return expect(yarnAudit_1.isValidVersion('0.0.0', '0.0.0')).toBe(true); });
    });
    describe('when given a patch version lower than acceptable', function () {
        it('returns false', function () { return expect(yarnAudit_1.isValidVersion('1.1.0', '1.1.1')).toBe(false); });
    });
    describe('when given a minor version lower than acceptable', function () {
        it('returns false', function () { return expect(yarnAudit_1.isValidVersion('1.0.1', '1.1.1')).toBe(false); });
    });
    describe('when given a major version lower than acceptable', function () {
        it('returns false', function () { return expect(yarnAudit_1.isValidVersion('0.1.1', '1.1.1')).toBe(false); });
    });
    describe('when given a major version lower than acceptable with a caret', function () {
        it('returns false', function () { return expect(yarnAudit_1.isValidVersion('^0.1.1', '1.1.1')).toBe(false); });
    });
    describe('when given a minor version lower than acceptable with a caret', function () {
        it('returns true', function () { return expect(yarnAudit_1.isValidVersion('^1.0.1', '1.1.1')).toBe(true); });
    });
    describe('when given a patch version is x', function () {
        it('returns true', function () { return expect(yarnAudit_1.isValidVersion('1.1.x', '1.1.1')).toBe(true); });
    });
    describe('when given a minor version is x', function () {
        it('returns true', function () { return expect(yarnAudit_1.isValidVersion('1.x.0', '1.1.1')).toBe(true); });
    });
    describe('when given multiple ranges of acceptable versions', function () {
        it('returns true', function () { return expect(yarnAudit_1.isValidVersion('1.x.0', '>=1.1.1 or >=2.0.0')).toBe(true); });
    });
    describe('when given multiple ranges of acceptable versions are the same', function () {
        it('returns true', function () { return expect(yarnAudit_1.isValidVersion('1.1.1', '>=1.1.1 or >=2.0.0')).toBe(true); });
    });
});
describe('isItGreaterOrEqual', function () {
    describe('when given a major version higher than acceptable', function () {
        it('returns true', function () { return expect(yarnAudit_1.isItGreaterOrEqual([1, 0, 0], [0, 0, 0])).toBe(true); });
    });
    describe('when given a minor version higher than acceptable', function () {
        it('returns true', function () { return expect(yarnAudit_1.isItGreaterOrEqual([0, 1, 0], [0, 0, 0])).toBe(true); });
    });
    describe('when given a patch version higher than acceptable', function () {
        it('returns true', function () { return expect(yarnAudit_1.isItGreaterOrEqual([0, 0, 1], [0, 0, 0])).toBe(true); });
    });
    describe('when given the same acceptable version', function () {
        it('returns true', function () { return expect(yarnAudit_1.isItGreaterOrEqual([0, 0, 0], [0, 0, 0])).toBe(true); });
    });
    describe('when given a patch version lower than acceptable', function () {
        it('returns false', function () { return expect(yarnAudit_1.isItGreaterOrEqual([1, 1, 0], [1, 1, 1])).toBe(false); });
    });
    describe('when given a minor version lower than acceptable', function () {
        it('returns false', function () { return expect(yarnAudit_1.isItGreaterOrEqual([1, 0, 1], [1, 1, 1])).toBe(false); });
    });
    describe('when given a major version lower than acceptable', function () {
        it('returns false', function () { return expect(yarnAudit_1.isItGreaterOrEqual([0, 1, 1], [1, 1, 1])).toBe(false); });
    });
    describe('when given a patch version is x', function () {
        it('returns true', function () { return expect(yarnAudit_1.isItGreaterOrEqual([1, 1, 'x'], [1, 1, 1])).toBe(true); });
    });
    describe('when given a minor version is x', function () {
        it('returns true', function () { return expect(yarnAudit_1.isItGreaterOrEqual([1, 'x', 0], [1, 1, 1])).toBe(true); });
    });
    describe('when given a greater major version', function () {
        it('returns true', function () { return expect(yarnAudit_1.isItGreaterOrEqual([4, 0, 0], [2, 1, 0])).toBe(true); });
    });
});
describe('buildTree', function () {
    it('returns the reverse dependency tree (dependent tree)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = expect;
                    return [4 /*yield*/, yarnAudit_1.buildTree([testData_1.testYarnAudit])];
                case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()]).toEqual([
                        {
                            "dependents": [
                                {
                                    "dependents": [
                                        {
                                            "dependents": [],
                                            "name": "api-external"
                                        },
                                        {
                                            "dependents": [],
                                            "name": "api-internal"
                                        },
                                        {
                                            "dependents": [],
                                            "name": "listener"
                                        },
                                        {
                                            "dependents": [],
                                            "name": "web"
                                        }
                                    ],
                                    "name": "@pluralsight/ps-redis-node"
                                },
                                {
                                    "dependents": [
                                        {
                                            "dependents": [],
                                            "name": "web"
                                        },
                                        {
                                            "dependents": [],
                                            "name": "listener"
                                        }
                                    ],
                                    "name": "launchdarkly-node-server-sdk"
                                }
                            ],
                            "name": "redis",
                            "patchedVersions": ">=3.1.1",
                            "version": "2.6.5"
                        },
                        {
                            "dependents": [
                                {
                                    "dependents": [
                                        {
                                            "dependents": [],
                                            "name": "api-external"
                                        },
                                        {
                                            "dependents": [],
                                            "name": "api-internal"
                                        },
                                        {
                                            "dependents": [],
                                            "name": "listener"
                                        },
                                        {
                                            "dependents": [],
                                            "name": "web"
                                        }
                                    ],
                                    "name": "@pluralsight/ps-redis-node"
                                },
                                {
                                    "dependents": [
                                        {
                                            "dependents": [],
                                            "name": "web"
                                        },
                                        {
                                            "dependents": [],
                                            "name": "listener"
                                        }
                                    ],
                                    "name": "launchdarkly-node-server-sdk"
                                }
                            ],
                            "name": "redis",
                            "patchedVersions": ">=3.1.1",
                            "version": "2.8.0"
                        }
                    ])];
            }
        });
    }); });
});
describe('divideAndConquer', function () {
    it('does nothing if there is nothing to do', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = expect;
                    return [4 /*yield*/, yarnAudit_1.divideAndConquer([], function (number) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, number >= 4];
                        }); }); })];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toBe(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns the number I am thinking of', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = expect;
                    return [4 /*yield*/, yarnAudit_1.divideAndConquer([1, 2, 3, 4, 5, 6, 7], function (number) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, number >= 4];
                        }); }); })];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toBe(4);
                    return [2 /*return*/];
            }
        });
    }); });
    it('calls the verify function fewer than the total number of options', function () { return __awaiter(void 0, void 0, void 0, function () {
        var verifyCount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    verifyCount = 0;
                    return [4 /*yield*/, yarnAudit_1.divideAndConquer([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], function (number) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                verifyCount++;
                                return [2 /*return*/, number >= 4];
                            });
                        }); })];
                case 1:
                    _a.sent();
                    expect(verifyCount).toBe(5);
                    return [2 /*return*/];
            }
        });
    }); });
    it('calls the verify function far fewer than the total number of options', function () { return __awaiter(void 0, void 0, void 0, function () {
        var verifyCount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    verifyCount = 0;
                    return [4 /*yield*/, yarnAudit_1.divideAndConquer(new Array(1000).fill('').map(function (item, index) { return index; }), function (number) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                verifyCount++;
                                return [2 /*return*/, number >= 99];
                            });
                        }); })];
                case 1:
                    _a.sent();
                    expect(verifyCount).toBe(11);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns undefined if no match', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = expect;
                    return [4 /*yield*/, yarnAudit_1.divideAndConquer(new Array(10).fill('').map(function (item, index) { return index; }), function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, false];
                            });
                        }); })];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toBe(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe.skip('fillViableVersions', function () {
    var test = {
        "name": "css-select",
        "dependents": []
    };
    var yarnInfo = {
        "type": "tree",
        "data": {
            "type": "list",
            "trees": [
                {
                    "name": "css-select@2.1.0",
                    "children": [
                        {
                            "name": "boolbase@^1.0.0",
                            "color": "dim",
                            "shadow": true
                        },
                        {
                            "name": "css-what@^3.2.1",
                            "color": "dim",
                            "shadow": true
                        },
                        {
                            "name": "domutils@^1.7.0",
                            "color": "dim",
                            "shadow": true
                        },
                        {
                            "name": "nth-check@^1.0.2",
                            "color": "dim",
                            "shadow": true
                        }
                    ],
                    "hint": null,
                    "color": null,
                    "depth": 0
                }
            ]
        }
    };
    it('returns with package info', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, yarnAudit_1.fillViableVersions(test, {
                        "name": "css-what",
                        "patchedVersions": ">=5.0.1",
                        "dependents": []
                    }, yarnInfo, testData_1.testNpmList)];
                case 1:
                    _a.sent();
                    expect(test).toEqual({
                        "name": "css-select",
                        "minimumViableVersion": "4.0.0",
                        "recommendedViableVersion": "4.1.3",
                        "latestViableVersion": "4.1.3",
                        "dependents": []
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
describe.skip('fillTreeViability', function () {
    var test = [{
            "name": "css-what",
            "patchedVersions": ">=5.0.1",
            "version": "3.4.2",
            "dependents": [
                {
                    "name": "css-select",
                    "dependents": [
                        {
                            "name": "svgo",
                            "dependents": [
                                {
                                    "name": "@pluralsight/ps-design-system-icon",
                                    "dependents": []
                                }
                            ]
                        }
                    ]
                }
            ]
        }];
    var yarnInfo = {
        "type": "tree",
        "data": {
            "type": "list",
            "trees": [
                {
                    "name": "css-select@2.1.0",
                    "children": [
                        {
                            "name": "boolbase@^1.0.0",
                            "color": "dim",
                            "shadow": true
                        },
                        {
                            "name": "css-what@^3.2.1",
                            "color": "dim",
                            "shadow": true
                        },
                        {
                            "name": "domutils@^1.7.0",
                            "color": "dim",
                            "shadow": true
                        },
                        {
                            "name": "nth-check@^1.0.2",
                            "color": "dim",
                            "shadow": true
                        }
                    ],
                    "hint": null,
                    "color": null,
                    "depth": 0
                }
            ]
        }
    };
    it('returns with package info', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, yarnAudit_1.fillTreeViability(test, yarnInfo, testData_1.testNpmList)];
                case 1:
                    _a.sent();
                    expect(test).toEqual([
                        {
                            "name": "css-what",
                            "patchedVersions": ">=5.0.1",
                            "version": "3.4.2",
                            "dependents": [
                                {
                                    "name": "css-select",
                                    "dependents": [
                                        {
                                            "name": "svgo",
                                            "dependents": [
                                                {
                                                    "name": "@pluralsight/ps-design-system-icon",
                                                    "dependents": [],
                                                    "latestViableVersion": "23.1.14",
                                                    "recommendedViableVersion": "23.1.14",
                                                    "minimumViableVersion": "2.0.2"
                                                }
                                            ],
                                            "latestViableVersion": "2.3.1",
                                            "recommendedViableVersion": "2.3.1",
                                            "minimumViableVersion": "0.0.1-2"
                                        }
                                    ],
                                    "latestViableVersion": "4.1.3",
                                    "recommendedViableVersion": "4.1.3",
                                    "minimumViableVersion": "4.0.0"
                                }
                            ]
                        }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); }, 30000);
});
describe('flattenDependentTree', function () {
    it('returns an flat list of dependents to work through', function () {
        expect(yarnAudit_1.flattenDependentTree([
            {
                "name": "css-what",
                "patchedVersions": ">=5.0.1",
                "version": "3.4.2",
                "dependents": [
                    {
                        "name": "css-select",
                        "dependents": [
                            {
                                "name": "svgo",
                                "dependents": [
                                    {
                                        "name": "@pluralsight/ps-design-system-icon",
                                        "dependents": [],
                                        "latestViableVersion": "23.1.14",
                                        "recommendedViableVersion": "23.1.14",
                                        "minimumViableVersion": "2.0.2"
                                    }
                                ],
                                "latestViableVersion": "2.3.1",
                                "recommendedViableVersion": "2.3.1",
                                "minimumViableVersion": "0.0.1-2"
                            }
                        ],
                        "latestViableVersion": "4.1.3",
                        "recommendedViableVersion": "4.1.3",
                        "minimumViableVersion": "4.0.0"
                    }
                ]
            }
        ])).toEqual([
            {
                "dependents": [
                    {
                        "dependents": [
                            {
                                "dependents": [
                                    {
                                        "dependents": [],
                                        "latestViableVersion": "23.1.14",
                                        "minimumViableVersion": "2.0.2",
                                        "name": "@pluralsight/ps-design-system-icon",
                                        "recommendedViableVersion": "23.1.14"
                                    }
                                ],
                                "latestViableVersion": "2.3.1",
                                "minimumViableVersion": "0.0.1-2",
                                "name": "svgo",
                                "recommendedViableVersion": "2.3.1"
                            }
                        ],
                        "latestViableVersion": "4.1.3",
                        "minimumViableVersion": "4.0.0",
                        "name": "css-select",
                        "recommendedViableVersion": "4.1.3"
                    }
                ],
                "name": "css-what",
                "patchedVersions": ">=5.0.1",
                "version": "3.4.2"
            },
            {
                "dependents": [
                    {
                        "dependents": [
                            {
                                "dependents": [],
                                "latestViableVersion": "23.1.14",
                                "minimumViableVersion": "2.0.2",
                                "name": "@pluralsight/ps-design-system-icon",
                                "recommendedViableVersion": "23.1.14"
                            }
                        ],
                        "latestViableVersion": "2.3.1",
                        "minimumViableVersion": "0.0.1-2",
                        "name": "svgo",
                        "recommendedViableVersion": "2.3.1"
                    }
                ],
                "latestViableVersion": "4.1.3",
                "minimumViableVersion": "4.0.0",
                "name": "css-select",
                "recommendedViableVersion": "4.1.3"
            },
            {
                "dependents": [
                    {
                        "dependents": [],
                        "latestViableVersion": "23.1.14",
                        "minimumViableVersion": "2.0.2",
                        "name": "@pluralsight/ps-design-system-icon",
                        "recommendedViableVersion": "23.1.14"
                    }
                ],
                "latestViableVersion": "2.3.1",
                "minimumViableVersion": "0.0.1-2",
                "name": "svgo",
                "recommendedViableVersion": "2.3.1"
            },
            {
                "dependents": [],
                "latestViableVersion": "23.1.14",
                "minimumViableVersion": "2.0.2",
                "name": "@pluralsight/ps-design-system-icon",
                "recommendedViableVersion": "23.1.14"
            }
        ]);
    });
});
describe('sortFlatDependentTree', function () {
    it('returns the flat list in the proper order', function () {
        expect(yarnAudit_1.sortFlatDependentTree([
            {
                "dependents": [
                    {
                        "dependents": [],
                        "name": "css-select",
                    }
                ],
                "name": "css-what",
            },
            {
                "dependents": [
                    {
                        "dependents": [],
                        "name": "svgo",
                    }
                ],
                "name": "css-select",
            },
            {
                "dependents": [],
                "name": "@pluralsight/ps-design-system-icon",
            },
            {
                "dependents": [
                    {
                        "dependents": [],
                        "name": "@pluralsight/ps-design-system-icon",
                    }
                ],
                "name": "svgo",
            }
        ])).toEqual([
            {
                "dependents": [],
                "name": "@pluralsight/ps-design-system-icon",
            },
            {
                "dependents": [
                    {
                        "dependents": [],
                        "name": "@pluralsight/ps-design-system-icon",
                    }
                ],
                "name": "svgo",
            },
            {
                "dependents": [
                    {
                        "dependents": [],
                        "name": "svgo",
                    }
                ],
                "name": "css-select",
            },
            {
                "dependents": [
                    {
                        "dependents": [],
                        "name": "css-select",
                    }
                ],
                "name": "css-what",
            }
        ]);
    });
    it('sorts it properly', function () {
        expect(yarnAudit_1.sortFlatDependentTree(testData_1.testFlatTree).map(function (i) { return i.name + "@" + (i.recommendedViableVersion || i.version); })).toEqual([
            "api-external@undefined",
            "api-internal@undefined",
            "listener@undefined",
            "web@undefined",
            "client@undefined",
            "@pluralsight/ps-design-system-textarea@undefined",
            "@pluralsight/ps-design-system-tab@undefined",
            "@pluralsight/ps-design-system-errors@undefined",
            "@pluralsight/ps-design-system-tag@undefined",
            "@pluralsight/ps-design-system-searchinput@undefined",
            "@pluralsight/ps-design-system-textinput@undefined",
            "@pluralsight/ps-design-system-button@undefined",
            "@pluralsight/ps-design-system-table@undefined",
            "@pluralsight/ps-design-system-drawer@undefined",
            "@pluralsight/ps-design-system-banner@undefined",
            "@pluralsight/ps-design-system-dropdown@undefined",
            "@pluralsight/ps-design-system-actionmenu@undefined",
            "@pluralsight/ps-design-system-icon@undefined",
            "svgo@2.3.1",
            "css-select@4.1.3",
            "css-what@3.4.2",
            "firebase-admin@9.9.0",
            "@firebase/database@0.10.5",
            "@firebase/component@0.5.3",
            "@firebase/util@0.3.2",
            "launchdarkly-node-server-sdk@5.14.5",
            "@pluralsight/ps-redis-node@undefined",
            "redis@2.8.0",
            "redis@2.6.5"
        ]);
    });
});
describe('upgradePackage', function () {
    it('logs the expected commands during a dry run', function () {
        var commandList = [];
        yarnAudit_1.upgradePackages(function (command) { return commandList.push(command); }, [
            {
                "dependents": [],
                "name": "@pluralsight/ps-design-system-icon",
            },
            {
                "dependents": [
                    {
                        "dependents": [],
                        "name": "@pluralsight/ps-design-system-icon",
                    }
                ],
                "name": "svgo",
            },
            {
                "dependents": [
                    {
                        "dependents": [],
                        "name": "svgo",
                    }
                ],
                "name": "css-select",
            },
            {
                "dependents": [
                    {
                        "dependents": [],
                        "name": "css-select",
                    }
                ],
                "minimumViableVersion": "2.0.0",
                "name": "css-what",
            }
        ]);
        expect(commandList).toEqual(["yarn upgrade css-what"]);
    });
});
describe('upgradeMajorPackages', function () {
    it('logs the expected commands during a dry run', function () {
        var commandList = [];
        yarnAudit_1.upgradeMajorPackages(function (command) { return commandList.push(command); }, [
            {
                "dependents": [],
                "name": "@pluralsight/ps-design-system-icon",
                "minimumViableVersion": "2.0.5",
            },
            {
                "dependents": [
                    {
                        "dependents": [],
                        "name": "@pluralsight/ps-design-system-icon",
                    }
                ],
                "name": "svgo",
            },
            {
                "dependents": [
                    {
                        "dependents": [],
                        "name": "svgo",
                    }
                ],
                "minimumViableVersion": "2.0.2",
                "name": "css-select",
            },
            {
                "dependents": [
                    {
                        "dependents": [],
                        "name": "css-select",
                    }
                ],
                "minimumViableVersion": "2.0.3",
                "name": "css-what",
            }
        ], [
            { name: '@pluralsight/ps-design-system-icon', version: '^1.2.99' }
        ]);
        expect(commandList).toEqual(["yarn add @pluralsight/ps-design-system-icon@^2.0.5 --ignore-workspace-root-check"]);
    });
    it('logs the expected commands during a dry run', function () {
        var commandList = [];
        yarnAudit_1.upgradeMajorPackages(function (command) { return commandList.push(command); }, [
            {
                "dependents": [],
                "name": "@pluralsight/ps-design-system-icon",
                "minimumViableVersion": "2.0.5",
            },
            {
                "dependents": [
                    {
                        "dependents": [],
                        "name": "@pluralsight/ps-design-system-icon",
                    }
                ],
                "name": "svgo",
            },
            {
                "dependents": [
                    {
                        "dependents": [],
                        "name": "svgo",
                    }
                ],
                "minimumViableVersion": "2.0.2",
                "name": "css-select",
            },
            {
                "dependents": [
                    {
                        "dependents": [],
                        "name": "css-select",
                    }
                ],
                "minimumViableVersion": "2.0.3",
                "name": "css-what",
            }
        ], [
            { name: '@pluralsight/ps-design-system-icon', version: '^0.2.99' }
        ]);
        expect(commandList).toEqual(["yarn add @pluralsight/ps-design-system-icon@^2.0.5 --ignore-workspace-root-check"]);
    });
});
