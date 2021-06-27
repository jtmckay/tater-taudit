"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testFlatTree = exports.testYarnAudit = void 0;
exports.testYarnAudit = {
    "type": "auditAdvisory",
    "data": {
        "resolution": {
            "id": 1662,
            "path": "launchdarkly-node-server-sdk>redis",
            "dev": false,
            "optional": false,
            "bundled": false
        },
        "advisory": {
            "findings": [
                {
                    "version": "2.6.5",
                    "paths": [
                        "@pluralsight/ps-redis-node>redis",
                        "api-external>@pluralsight/ps-redis-node>redis",
                        "api-internal>@pluralsight/ps-redis-node>redis",
                        "listener>@pluralsight/ps-redis-node>redis",
                        "web>@pluralsight/ps-redis-node>redis"
                    ]
                },
                {
                    "version": "2.8.0",
                    "paths": [
                        "launchdarkly-node-server-sdk>redis",
                        "web>launchdarkly-node-server-sdk>redis",
                        "listener>launchdarkly-node-server-sdk>redis"
                    ]
                }
            ],
            "id": 1662,
            "created": "2021-05-04T03:47:22.289Z",
            "updated": "2021-05-04T18:21:16.103Z",
            "deleted": null,
            "title": "Regular Expression Denial of Service",
            "found_by": {
                "link": "",
                "name": "Anonymous",
                "email": ""
            },
            "reported_by": {
                "link": "",
                "name": "Anonymous",
                "email": ""
            },
            "module_name": "redis",
            "cves": [
                "CVE-2021-29469"
            ],
            "vulnerable_versions": ">=2.6.0 <3.1.1",
            "patched_versions": ">=3.1.1",
            "overview": "In \\`redis\\` before version 3.1.1, when a client is in monitoring mode, the regex begin used to detected monitor messages could cause exponential backtracking on some strings. This issue could lead to a denial of service.\n\n### Patches\nThe problem was fixed in commit [\\`2d11b6d\\`](https://github.com/NodeRedis/node-redis/commit/2d11b6dc9b9774464a91fb4b448bad8bf699629e) and was released in version \\`3.1.1\\`.",
            "recommendation": "Upgrade to version 3.1.1 or later",
            "references": "[CVE](https://nvd.nist.gov/vuln/detail/CVE-2021-29469)\n[GitHub Advisory](https://github.com/advisories/GHSA-35q2-47q7-3pc3)\n",
            "access": "public",
            "severity": "low",
            "cwe": "CWE-400",
            "metadata": {
                "module_type": "",
                "exploitability": 3,
                "affected_components": ""
            },
            "url": "https://npmjs.com/advisories/1662"
        }
    }
};
exports.testFlatTree = [
    {
        "name": "redis",
        "patchedVersions": ">=3.1.1",
        "dependents": [
            {
                "name": "@pluralsight/ps-redis-node",
                "dependents": [
                    {
                        "name": "api-external",
                        "dependents": []
                    },
                    {
                        "name": "api-internal",
                        "dependents": []
                    },
                    {
                        "name": "listener",
                        "dependents": []
                    },
                    {
                        "name": "web",
                        "dependents": []
                    }
                ]
            },
            {
                "name": "launchdarkly-node-server-sdk",
                "dependents": [
                    {
                        "name": "web",
                        "dependents": [],
                        "latestViableVersion": "0.0.2",
                        "recommendedViableVersion": "0.0.2"
                    },
                    {
                        "name": "listener",
                        "dependents": [],
                        "latestViableVersion": "1.0.1",
                        "recommendedViableVersion": "1.0.1",
                        "earliestViableVersion": "1.0.0"
                    }
                ],
                "latestViableVersion": "6.1.0",
                "recommendedViableVersion": "5.14.5",
                "earliestViableVersion": "5.13.1"
            }
        ],
        "version": "2.6.5"
    },
    {
        "name": "@pluralsight/ps-redis-node",
        "dependents": [
            {
                "name": "api-external",
                "dependents": []
            },
            {
                "name": "api-internal",
                "dependents": []
            },
            {
                "name": "listener",
                "dependents": []
            },
            {
                "name": "web",
                "dependents": []
            }
        ]
    },
    {
        "name": "api-external",
        "dependents": []
    },
    {
        "name": "api-internal",
        "dependents": []
    },
    {
        "name": "listener",
        "dependents": []
    },
    {
        "name": "web",
        "dependents": []
    },
    {
        "name": "launchdarkly-node-server-sdk",
        "dependents": [
            {
                "name": "web",
                "dependents": [],
                "latestViableVersion": "0.0.2",
                "recommendedViableVersion": "0.0.2"
            },
            {
                "name": "listener",
                "dependents": [],
                "latestViableVersion": "1.0.1",
                "recommendedViableVersion": "1.0.1",
                "earliestViableVersion": "1.0.0"
            }
        ],
        "latestViableVersion": "6.1.0",
        "recommendedViableVersion": "5.14.5",
        "earliestViableVersion": "5.13.1"
    },
    {
        "name": "redis",
        "patchedVersions": ">=3.1.1",
        "dependents": [
            {
                "name": "@pluralsight/ps-redis-node",
                "dependents": [
                    {
                        "name": "api-external",
                        "dependents": []
                    },
                    {
                        "name": "api-internal",
                        "dependents": []
                    },
                    {
                        "name": "listener",
                        "dependents": []
                    },
                    {
                        "name": "web",
                        "dependents": []
                    }
                ]
            },
            {
                "name": "launchdarkly-node-server-sdk",
                "dependents": [
                    {
                        "name": "web",
                        "dependents": [],
                        "latestViableVersion": "0.0.2",
                        "recommendedViableVersion": "0.0.2"
                    },
                    {
                        "name": "listener",
                        "dependents": [],
                        "latestViableVersion": "1.0.1",
                        "recommendedViableVersion": "1.0.1",
                        "earliestViableVersion": "1.0.0"
                    }
                ],
                "latestViableVersion": "6.1.0",
                "recommendedViableVersion": "5.14.5",
                "earliestViableVersion": "5.13.1"
            }
        ],
        "version": "2.8.0"
    },
    {
        "name": "@firebase/util",
        "patchedVersions": ">=0.3.4",
        "dependents": [
            {
                "name": "@firebase/component",
                "dependents": [
                    {
                        "name": "@firebase/database",
                        "dependents": [
                            {
                                "name": "firebase-admin",
                                "dependents": [
                                    {
                                        "name": "api-internal",
                                        "dependents": []
                                    },
                                    {
                                        "name": "listener",
                                        "dependents": [],
                                        "latestViableVersion": "1.0.1",
                                        "recommendedViableVersion": "1.0.1",
                                        "earliestViableVersion": "1.0.0"
                                    },
                                    {
                                        "name": "web",
                                        "dependents": [],
                                        "latestViableVersion": "0.0.2",
                                        "recommendedViableVersion": "0.0.2"
                                    }
                                ],
                                "latestViableVersion": "9.10.0",
                                "recommendedViableVersion": "9.9.0",
                                "earliestViableVersion": "9.2.0"
                            }
                        ],
                        "latestViableVersion": "0.10.5",
                        "recommendedViableVersion": "0.10.5",
                        "earliestViableVersion": "0.7.0-2020922203858"
                    }
                ],
                "latestViableVersion": "0.5.3",
                "recommendedViableVersion": "0.5.3",
                "earliestViableVersion": "0.1.21-1.0.0-eap-firestore-debug.9c6096f43"
            },
            {
                "name": "@firebase/database",
                "dependents": [
                    {
                        "name": "firebase-admin",
                        "dependents": [
                            {
                                "name": "api-internal",
                                "dependents": []
                            },
                            {
                                "name": "listener",
                                "dependents": [],
                                "latestViableVersion": "1.0.1",
                                "recommendedViableVersion": "1.0.1",
                                "earliestViableVersion": "1.0.0"
                            },
                            {
                                "name": "web",
                                "dependents": [],
                                "latestViableVersion": "0.0.2",
                                "recommendedViableVersion": "0.0.2"
                            }
                        ],
                        "latestViableVersion": "9.10.0",
                        "recommendedViableVersion": "9.9.0",
                        "earliestViableVersion": "9.2.0"
                    }
                ],
                "latestViableVersion": "0.10.5",
                "recommendedViableVersion": "0.10.5",
                "earliestViableVersion": "0.7.1-2020103231751"
            }
        ],
        "version": "0.3.2"
    },
    {
        "name": "@firebase/component",
        "dependents": [
            {
                "name": "@firebase/database",
                "dependents": [
                    {
                        "name": "firebase-admin",
                        "dependents": [
                            {
                                "name": "api-internal",
                                "dependents": []
                            },
                            {
                                "name": "listener",
                                "dependents": [],
                                "latestViableVersion": "1.0.1",
                                "recommendedViableVersion": "1.0.1",
                                "earliestViableVersion": "1.0.0"
                            },
                            {
                                "name": "web",
                                "dependents": [],
                                "latestViableVersion": "0.0.2",
                                "recommendedViableVersion": "0.0.2"
                            }
                        ],
                        "latestViableVersion": "9.10.0",
                        "recommendedViableVersion": "9.9.0",
                        "earliestViableVersion": "9.2.0"
                    }
                ],
                "latestViableVersion": "0.10.5",
                "recommendedViableVersion": "0.10.5",
                "earliestViableVersion": "0.7.0-2020922203858"
            }
        ],
        "latestViableVersion": "0.5.3",
        "recommendedViableVersion": "0.5.3",
        "earliestViableVersion": "0.1.21-1.0.0-eap-firestore-debug.9c6096f43"
    },
    {
        "name": "@firebase/database",
        "dependents": [
            {
                "name": "firebase-admin",
                "dependents": [
                    {
                        "name": "api-internal",
                        "dependents": []
                    },
                    {
                        "name": "listener",
                        "dependents": [],
                        "latestViableVersion": "1.0.1",
                        "recommendedViableVersion": "1.0.1",
                        "earliestViableVersion": "1.0.0"
                    },
                    {
                        "name": "web",
                        "dependents": [],
                        "latestViableVersion": "0.0.2",
                        "recommendedViableVersion": "0.0.2"
                    }
                ],
                "latestViableVersion": "9.10.0",
                "recommendedViableVersion": "9.9.0",
                "earliestViableVersion": "9.2.0"
            }
        ],
        "latestViableVersion": "0.10.5",
        "recommendedViableVersion": "0.10.5",
        "earliestViableVersion": "0.7.0-2020922203858"
    },
    {
        "name": "firebase-admin",
        "dependents": [
            {
                "name": "api-internal",
                "dependents": []
            },
            {
                "name": "listener",
                "dependents": [],
                "latestViableVersion": "1.0.1",
                "recommendedViableVersion": "1.0.1",
                "earliestViableVersion": "1.0.0"
            },
            {
                "name": "web",
                "dependents": [],
                "latestViableVersion": "0.0.2",
                "recommendedViableVersion": "0.0.2"
            }
        ],
        "latestViableVersion": "9.10.0",
        "recommendedViableVersion": "9.9.0",
        "earliestViableVersion": "9.2.0"
    },
    {
        "name": "css-what",
        "patchedVersions": ">=5.0.1",
        "dependents": [
            {
                "name": "css-select",
                "dependents": [
                    {
                        "name": "svgo",
                        "dependents": [
                            {
                                "name": "@pluralsight/ps-design-system-icon",
                                "dependents": [
                                    {
                                        "name": "@pluralsight/ps-design-system-actionmenu",
                                        "dependents": [
                                            {
                                                "name": "client",
                                                "dependents": []
                                            },
                                            {
                                                "name": "@pluralsight/ps-design-system-dropdown",
                                                "dependents": [
                                                    {
                                                        "name": "client",
                                                        "dependents": []
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "name": "@pluralsight/ps-design-system-banner",
                                        "dependents": [
                                            {
                                                "name": "client",
                                                "dependents": []
                                            }
                                        ]
                                    },
                                    {
                                        "name": "@pluralsight/ps-design-system-drawer",
                                        "dependents": [
                                            {
                                                "name": "client",
                                                "dependents": []
                                            },
                                            {
                                                "name": "@pluralsight/ps-design-system-table",
                                                "dependents": [
                                                    {
                                                        "name": "client",
                                                        "dependents": []
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "name": "@pluralsight/ps-design-system-dropdown",
                                        "dependents": [
                                            {
                                                "name": "client",
                                                "dependents": []
                                            }
                                        ]
                                    },
                                    {
                                        "name": "@pluralsight/ps-design-system-searchinput",
                                        "dependents": [
                                            {
                                                "name": "client",
                                                "dependents": []
                                            }
                                        ]
                                    },
                                    {
                                        "name": "@pluralsight/ps-design-system-table",
                                        "dependents": [
                                            {
                                                "name": "client",
                                                "dependents": []
                                            }
                                        ]
                                    },
                                    {
                                        "name": "@pluralsight/ps-design-system-tag",
                                        "dependents": [
                                            {
                                                "name": "client",
                                                "dependents": []
                                            }
                                        ]
                                    },
                                    {
                                        "name": "@pluralsight/ps-design-system-textinput",
                                        "dependents": [
                                            {
                                                "name": "client",
                                                "dependents": []
                                            },
                                            {
                                                "name": "@pluralsight/ps-design-system-searchinput",
                                                "dependents": [
                                                    {
                                                        "name": "client",
                                                        "dependents": []
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "name": "@pluralsight/ps-design-system-button",
                                        "dependents": [
                                            {
                                                "name": "client",
                                                "dependents": []
                                            },
                                            {
                                                "name": "@pluralsight/ps-design-system-errors",
                                                "dependents": [
                                                    {
                                                        "name": "client",
                                                        "dependents": []
                                                    },
                                                    {
                                                        "name": "web",
                                                        "dependents": []
                                                    }
                                                ]
                                            },
                                            {
                                                "name": "@pluralsight/ps-design-system-searchinput",
                                                "dependents": [
                                                    {
                                                        "name": "client",
                                                        "dependents": []
                                                    }
                                                ]
                                            },
                                            {
                                                "name": "@pluralsight/ps-design-system-textinput",
                                                "dependents": [
                                                    {
                                                        "name": "@pluralsight/ps-design-system-searchinput",
                                                        "dependents": [
                                                            {
                                                                "name": "client",
                                                                "dependents": []
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "name": "client",
                                                        "dependents": []
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "name": "@pluralsight/ps-design-system-errors",
                                        "dependents": [
                                            {
                                                "name": "client",
                                                "dependents": []
                                            },
                                            {
                                                "name": "web",
                                                "dependents": []
                                            }
                                        ]
                                    },
                                    {
                                        "name": "client",
                                        "dependents": []
                                    },
                                    {
                                        "name": "@pluralsight/ps-design-system-tab",
                                        "dependents": [
                                            {
                                                "name": "client",
                                                "dependents": []
                                            }
                                        ]
                                    },
                                    {
                                        "name": "@pluralsight/ps-design-system-textarea",
                                        "dependents": [
                                            {
                                                "name": "client",
                                                "dependents": []
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "latestViableVersion": "2.3.1",
                        "recommendedViableVersion": "2.3.1",
                        "earliestViableVersion": "2.3.1"
                    }
                ],
                "latestViableVersion": "4.1.3",
                "recommendedViableVersion": "4.1.3",
                "earliestViableVersion": "4.0.0"
            }
        ],
        "version": "3.4.2"
    },
    {
        "name": "css-select",
        "dependents": [
            {
                "name": "svgo",
                "dependents": [
                    {
                        "name": "@pluralsight/ps-design-system-icon",
                        "dependents": [
                            {
                                "name": "@pluralsight/ps-design-system-actionmenu",
                                "dependents": [
                                    {
                                        "name": "client",
                                        "dependents": []
                                    },
                                    {
                                        "name": "@pluralsight/ps-design-system-dropdown",
                                        "dependents": [
                                            {
                                                "name": "client",
                                                "dependents": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "@pluralsight/ps-design-system-banner",
                                "dependents": [
                                    {
                                        "name": "client",
                                        "dependents": []
                                    }
                                ]
                            },
                            {
                                "name": "@pluralsight/ps-design-system-drawer",
                                "dependents": [
                                    {
                                        "name": "client",
                                        "dependents": []
                                    },
                                    {
                                        "name": "@pluralsight/ps-design-system-table",
                                        "dependents": [
                                            {
                                                "name": "client",
                                                "dependents": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "@pluralsight/ps-design-system-dropdown",
                                "dependents": [
                                    {
                                        "name": "client",
                                        "dependents": []
                                    }
                                ]
                            },
                            {
                                "name": "@pluralsight/ps-design-system-searchinput",
                                "dependents": [
                                    {
                                        "name": "client",
                                        "dependents": []
                                    }
                                ]
                            },
                            {
                                "name": "@pluralsight/ps-design-system-table",
                                "dependents": [
                                    {
                                        "name": "client",
                                        "dependents": []
                                    }
                                ]
                            },
                            {
                                "name": "@pluralsight/ps-design-system-tag",
                                "dependents": [
                                    {
                                        "name": "client",
                                        "dependents": []
                                    }
                                ]
                            },
                            {
                                "name": "@pluralsight/ps-design-system-textinput",
                                "dependents": [
                                    {
                                        "name": "client",
                                        "dependents": []
                                    },
                                    {
                                        "name": "@pluralsight/ps-design-system-searchinput",
                                        "dependents": [
                                            {
                                                "name": "client",
                                                "dependents": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "@pluralsight/ps-design-system-button",
                                "dependents": [
                                    {
                                        "name": "client",
                                        "dependents": []
                                    },
                                    {
                                        "name": "@pluralsight/ps-design-system-errors",
                                        "dependents": [
                                            {
                                                "name": "client",
                                                "dependents": []
                                            },
                                            {
                                                "name": "web",
                                                "dependents": []
                                            }
                                        ]
                                    },
                                    {
                                        "name": "@pluralsight/ps-design-system-searchinput",
                                        "dependents": [
                                            {
                                                "name": "client",
                                                "dependents": []
                                            }
                                        ]
                                    },
                                    {
                                        "name": "@pluralsight/ps-design-system-textinput",
                                        "dependents": [
                                            {
                                                "name": "@pluralsight/ps-design-system-searchinput",
                                                "dependents": [
                                                    {
                                                        "name": "client",
                                                        "dependents": []
                                                    }
                                                ]
                                            },
                                            {
                                                "name": "client",
                                                "dependents": []
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "@pluralsight/ps-design-system-errors",
                                "dependents": [
                                    {
                                        "name": "client",
                                        "dependents": []
                                    },
                                    {
                                        "name": "web",
                                        "dependents": []
                                    }
                                ]
                            },
                            {
                                "name": "client",
                                "dependents": []
                            },
                            {
                                "name": "@pluralsight/ps-design-system-tab",
                                "dependents": [
                                    {
                                        "name": "client",
                                        "dependents": []
                                    }
                                ]
                            },
                            {
                                "name": "@pluralsight/ps-design-system-textarea",
                                "dependents": [
                                    {
                                        "name": "client",
                                        "dependents": []
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "latestViableVersion": "2.3.1",
                "recommendedViableVersion": "2.3.1",
                "earliestViableVersion": "2.3.1"
            }
        ],
        "latestViableVersion": "4.1.3",
        "recommendedViableVersion": "4.1.3",
        "earliestViableVersion": "4.0.0"
    },
    {
        "name": "svgo",
        "dependents": [
            {
                "name": "@pluralsight/ps-design-system-icon",
                "dependents": [
                    {
                        "name": "@pluralsight/ps-design-system-actionmenu",
                        "dependents": [
                            {
                                "name": "client",
                                "dependents": []
                            },
                            {
                                "name": "@pluralsight/ps-design-system-dropdown",
                                "dependents": [
                                    {
                                        "name": "client",
                                        "dependents": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "@pluralsight/ps-design-system-banner",
                        "dependents": [
                            {
                                "name": "client",
                                "dependents": []
                            }
                        ]
                    },
                    {
                        "name": "@pluralsight/ps-design-system-drawer",
                        "dependents": [
                            {
                                "name": "client",
                                "dependents": []
                            },
                            {
                                "name": "@pluralsight/ps-design-system-table",
                                "dependents": [
                                    {
                                        "name": "client",
                                        "dependents": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "@pluralsight/ps-design-system-dropdown",
                        "dependents": [
                            {
                                "name": "client",
                                "dependents": []
                            }
                        ]
                    },
                    {
                        "name": "@pluralsight/ps-design-system-searchinput",
                        "dependents": [
                            {
                                "name": "client",
                                "dependents": []
                            }
                        ]
                    },
                    {
                        "name": "@pluralsight/ps-design-system-table",
                        "dependents": [
                            {
                                "name": "client",
                                "dependents": []
                            }
                        ]
                    },
                    {
                        "name": "@pluralsight/ps-design-system-tag",
                        "dependents": [
                            {
                                "name": "client",
                                "dependents": []
                            }
                        ]
                    },
                    {
                        "name": "@pluralsight/ps-design-system-textinput",
                        "dependents": [
                            {
                                "name": "client",
                                "dependents": []
                            },
                            {
                                "name": "@pluralsight/ps-design-system-searchinput",
                                "dependents": [
                                    {
                                        "name": "client",
                                        "dependents": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "@pluralsight/ps-design-system-button",
                        "dependents": [
                            {
                                "name": "client",
                                "dependents": []
                            },
                            {
                                "name": "@pluralsight/ps-design-system-errors",
                                "dependents": [
                                    {
                                        "name": "client",
                                        "dependents": []
                                    },
                                    {
                                        "name": "web",
                                        "dependents": []
                                    }
                                ]
                            },
                            {
                                "name": "@pluralsight/ps-design-system-searchinput",
                                "dependents": [
                                    {
                                        "name": "client",
                                        "dependents": []
                                    }
                                ]
                            },
                            {
                                "name": "@pluralsight/ps-design-system-textinput",
                                "dependents": [
                                    {
                                        "name": "@pluralsight/ps-design-system-searchinput",
                                        "dependents": [
                                            {
                                                "name": "client",
                                                "dependents": []
                                            }
                                        ]
                                    },
                                    {
                                        "name": "client",
                                        "dependents": []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "@pluralsight/ps-design-system-errors",
                        "dependents": [
                            {
                                "name": "client",
                                "dependents": []
                            },
                            {
                                "name": "web",
                                "dependents": []
                            }
                        ]
                    },
                    {
                        "name": "client",
                        "dependents": []
                    },
                    {
                        "name": "@pluralsight/ps-design-system-tab",
                        "dependents": [
                            {
                                "name": "client",
                                "dependents": []
                            }
                        ]
                    },
                    {
                        "name": "@pluralsight/ps-design-system-textarea",
                        "dependents": [
                            {
                                "name": "client",
                                "dependents": []
                            }
                        ]
                    }
                ]
            }
        ],
        "latestViableVersion": "2.3.1",
        "recommendedViableVersion": "2.3.1",
        "earliestViableVersion": "2.3.1"
    },
    {
        "name": "@pluralsight/ps-design-system-icon",
        "dependents": [
            {
                "name": "@pluralsight/ps-design-system-actionmenu",
                "dependents": [
                    {
                        "name": "client",
                        "dependents": []
                    },
                    {
                        "name": "@pluralsight/ps-design-system-dropdown",
                        "dependents": [
                            {
                                "name": "client",
                                "dependents": []
                            }
                        ]
                    }
                ]
            },
            {
                "name": "@pluralsight/ps-design-system-banner",
                "dependents": [
                    {
                        "name": "client",
                        "dependents": []
                    }
                ]
            },
            {
                "name": "@pluralsight/ps-design-system-drawer",
                "dependents": [
                    {
                        "name": "client",
                        "dependents": []
                    },
                    {
                        "name": "@pluralsight/ps-design-system-table",
                        "dependents": [
                            {
                                "name": "client",
                                "dependents": []
                            }
                        ]
                    }
                ]
            },
            {
                "name": "@pluralsight/ps-design-system-dropdown",
                "dependents": [
                    {
                        "name": "client",
                        "dependents": []
                    }
                ]
            },
            {
                "name": "@pluralsight/ps-design-system-searchinput",
                "dependents": [
                    {
                        "name": "client",
                        "dependents": []
                    }
                ]
            },
            {
                "name": "@pluralsight/ps-design-system-table",
                "dependents": [
                    {
                        "name": "client",
                        "dependents": []
                    }
                ]
            },
            {
                "name": "@pluralsight/ps-design-system-tag",
                "dependents": [
                    {
                        "name": "client",
                        "dependents": []
                    }
                ]
            },
            {
                "name": "@pluralsight/ps-design-system-textinput",
                "dependents": [
                    {
                        "name": "client",
                        "dependents": []
                    },
                    {
                        "name": "@pluralsight/ps-design-system-searchinput",
                        "dependents": [
                            {
                                "name": "client",
                                "dependents": []
                            }
                        ]
                    }
                ]
            },
            {
                "name": "@pluralsight/ps-design-system-button",
                "dependents": [
                    {
                        "name": "client",
                        "dependents": []
                    },
                    {
                        "name": "@pluralsight/ps-design-system-errors",
                        "dependents": [
                            {
                                "name": "client",
                                "dependents": []
                            },
                            {
                                "name": "web",
                                "dependents": []
                            }
                        ]
                    },
                    {
                        "name": "@pluralsight/ps-design-system-searchinput",
                        "dependents": [
                            {
                                "name": "client",
                                "dependents": []
                            }
                        ]
                    },
                    {
                        "name": "@pluralsight/ps-design-system-textinput",
                        "dependents": [
                            {
                                "name": "@pluralsight/ps-design-system-searchinput",
                                "dependents": [
                                    {
                                        "name": "client",
                                        "dependents": []
                                    }
                                ]
                            },
                            {
                                "name": "client",
                                "dependents": []
                            }
                        ]
                    }
                ]
            },
            {
                "name": "@pluralsight/ps-design-system-errors",
                "dependents": [
                    {
                        "name": "client",
                        "dependents": []
                    },
                    {
                        "name": "web",
                        "dependents": []
                    }
                ]
            },
            {
                "name": "client",
                "dependents": []
            },
            {
                "name": "@pluralsight/ps-design-system-tab",
                "dependents": [
                    {
                        "name": "client",
                        "dependents": []
                    }
                ]
            },
            {
                "name": "@pluralsight/ps-design-system-textarea",
                "dependents": [
                    {
                        "name": "client",
                        "dependents": []
                    }
                ]
            }
        ]
    },
    {
        "name": "@pluralsight/ps-design-system-actionmenu",
        "dependents": [
            {
                "name": "client",
                "dependents": []
            },
            {
                "name": "@pluralsight/ps-design-system-dropdown",
                "dependents": [
                    {
                        "name": "client",
                        "dependents": []
                    }
                ]
            }
        ]
    },
    {
        "name": "client",
        "dependents": []
    },
    {
        "name": "@pluralsight/ps-design-system-dropdown",
        "dependents": [
            {
                "name": "client",
                "dependents": []
            }
        ]
    },
    {
        "name": "@pluralsight/ps-design-system-banner",
        "dependents": [
            {
                "name": "client",
                "dependents": []
            }
        ]
    },
    {
        "name": "@pluralsight/ps-design-system-drawer",
        "dependents": [
            {
                "name": "client",
                "dependents": []
            },
            {
                "name": "@pluralsight/ps-design-system-table",
                "dependents": [
                    {
                        "name": "client",
                        "dependents": []
                    }
                ]
            }
        ]
    },
    {
        "name": "@pluralsight/ps-design-system-table",
        "dependents": [
            {
                "name": "client",
                "dependents": []
            }
        ]
    },
    {
        "name": "@pluralsight/ps-design-system-searchinput",
        "dependents": [
            {
                "name": "client",
                "dependents": []
            }
        ]
    },
    {
        "name": "@pluralsight/ps-design-system-tag",
        "dependents": [
            {
                "name": "client",
                "dependents": []
            }
        ]
    },
    {
        "name": "@pluralsight/ps-design-system-textinput",
        "dependents": [
            {
                "name": "client",
                "dependents": []
            },
            {
                "name": "@pluralsight/ps-design-system-searchinput",
                "dependents": [
                    {
                        "name": "client",
                        "dependents": []
                    }
                ]
            }
        ]
    },
    {
        "name": "@pluralsight/ps-design-system-button",
        "dependents": [
            {
                "name": "client",
                "dependents": []
            },
            {
                "name": "@pluralsight/ps-design-system-errors",
                "dependents": [
                    {
                        "name": "client",
                        "dependents": []
                    },
                    {
                        "name": "web",
                        "dependents": []
                    }
                ]
            },
            {
                "name": "@pluralsight/ps-design-system-searchinput",
                "dependents": [
                    {
                        "name": "client",
                        "dependents": []
                    }
                ]
            },
            {
                "name": "@pluralsight/ps-design-system-textinput",
                "dependents": [
                    {
                        "name": "@pluralsight/ps-design-system-searchinput",
                        "dependents": [
                            {
                                "name": "client",
                                "dependents": []
                            }
                        ]
                    },
                    {
                        "name": "client",
                        "dependents": []
                    }
                ]
            }
        ]
    },
    {
        "name": "@pluralsight/ps-design-system-errors",
        "dependents": [
            {
                "name": "client",
                "dependents": []
            },
            {
                "name": "web",
                "dependents": []
            }
        ]
    },
    {
        "name": "@pluralsight/ps-design-system-tab",
        "dependents": [
            {
                "name": "client",
                "dependents": []
            }
        ]
    },
    {
        "name": "@pluralsight/ps-design-system-textarea",
        "dependents": [
            {
                "name": "client",
                "dependents": []
            }
        ]
    }
];
