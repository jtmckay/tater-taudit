import {
  NpmList,
  PackageDependency,
  YarnAudit
} from "../yarnAudit";

export const testYarnAudit: YarnAudit = {
  "type":"auditAdvisory",
  "data":{
      "resolution":{
        "id":1662,
        "path":"launchdarkly-node-server-sdk>redis",
        "dev":false,
        "optional":false,
        "bundled":false
      },
      "advisory":{
        "findings":[
            {
              "version":"2.6.5",
              "paths":[
                  "@pluralsight/ps-redis-node>redis",
                  "api-external>@pluralsight/ps-redis-node>redis",
                  "api-internal>@pluralsight/ps-redis-node>redis",
                  "listener>@pluralsight/ps-redis-node>redis",
                  "web>@pluralsight/ps-redis-node>redis"
              ]
            },
            {
              "version":"2.8.0",
              "paths":[
                  "launchdarkly-node-server-sdk>redis",
                  "web>launchdarkly-node-server-sdk>redis",
                  "listener>launchdarkly-node-server-sdk>redis"
              ]
            }
        ],
        "id":1662,
        "created":"2021-05-04T03:47:22.289Z",
        "updated":"2021-05-04T18:21:16.103Z",
        "deleted":null,
        "title":"Regular Expression Denial of Service",
        "found_by":{
            "link":"",
            "name":"Anonymous",
            "email":""
        },
        "reported_by":{
            "link":"",
            "name":"Anonymous",
            "email":""
        },
        "module_name":"redis",
        "cves":[
            "CVE-2021-29469"
        ],
        "vulnerable_versions":">=2.6.0 <3.1.1",
        "patched_versions":">=3.1.1",
        "overview":"In \\`redis\\` before version 3.1.1, when a client is in monitoring mode, the regex begin used to detected monitor messages could cause exponential backtracking on some strings. This issue could lead to a denial of service.\n\n### Patches\nThe problem was fixed in commit [\\`2d11b6d\\`](https://github.com/NodeRedis/node-redis/commit/2d11b6dc9b9774464a91fb4b448bad8bf699629e) and was released in version \\`3.1.1\\`.",
        "recommendation":"Upgrade to version 3.1.1 or later",
        "references":"[CVE](https://nvd.nist.gov/vuln/detail/CVE-2021-29469)\n[GitHub Advisory](https://github.com/advisories/GHSA-35q2-47q7-3pc3)\n",
        "access":"public",
        "severity":"low",
        "cwe":"CWE-400",
        "metadata":{
            "module_type":"",
            "exploitability":3,
            "affected_components":""
        },
        "url":"https://npmjs.com/advisories/1662"
      }
  }
}

export const testFlatTree: PackageDependency[] = [
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
            "leastViableVersion": "1.0.0"
          }
        ],
        "latestViableVersion": "6.1.0",
        "recommendedViableVersion": "5.14.5",
        "leastViableVersion": "5.13.1"
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
        "leastViableVersion": "1.0.0"
      }
    ],
    "latestViableVersion": "6.1.0",
    "recommendedViableVersion": "5.14.5",
    "leastViableVersion": "5.13.1"
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
            "leastViableVersion": "1.0.0"
          }
        ],
        "latestViableVersion": "6.1.0",
        "recommendedViableVersion": "5.14.5",
        "leastViableVersion": "5.13.1"
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
                    "leastViableVersion": "1.0.0"
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
                "leastViableVersion": "9.2.0"
              }
            ],
            "latestViableVersion": "0.10.5",
            "recommendedViableVersion": "0.10.5",
            "leastViableVersion": "0.7.0-2020922203858"
          }
        ],
        "latestViableVersion": "0.5.3",
        "recommendedViableVersion": "0.5.3",
        "leastViableVersion": "0.1.21-1.0.0-eap-firestore-debug.9c6096f43"
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
                "leastViableVersion": "1.0.0"
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
            "leastViableVersion": "9.2.0"
          }
        ],
        "latestViableVersion": "0.10.5",
        "recommendedViableVersion": "0.10.5",
        "leastViableVersion": "0.7.1-2020103231751"
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
                "leastViableVersion": "1.0.0"
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
            "leastViableVersion": "9.2.0"
          }
        ],
        "latestViableVersion": "0.10.5",
        "recommendedViableVersion": "0.10.5",
        "leastViableVersion": "0.7.0-2020922203858"
      }
    ],
    "latestViableVersion": "0.5.3",
    "recommendedViableVersion": "0.5.3",
    "leastViableVersion": "0.1.21-1.0.0-eap-firestore-debug.9c6096f43"
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
            "leastViableVersion": "1.0.0"
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
        "leastViableVersion": "9.2.0"
      }
    ],
    "latestViableVersion": "0.10.5",
    "recommendedViableVersion": "0.10.5",
    "leastViableVersion": "0.7.0-2020922203858"
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
        "leastViableVersion": "1.0.0"
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
    "leastViableVersion": "9.2.0"
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
            "leastViableVersion": "2.3.1"
          }
        ],
        "latestViableVersion": "4.1.3",
        "recommendedViableVersion": "4.1.3",
        "leastViableVersion": "4.0.0"
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
        "leastViableVersion": "2.3.1"
      }
    ],
    "latestViableVersion": "4.1.3",
    "recommendedViableVersion": "4.1.3",
    "leastViableVersion": "4.0.0"
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
    "leastViableVersion": "2.3.1"
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
]

export const testNpmList: NpmList = {
  "version": "1.0.0",
  "name": "communications",
  "dependencies": {
    "@pluralsight/ps-bunyan-serializers": {
      "version": "0.2.0",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/@pluralsight/ps-bunyan-serializers/-/@pluralsight/ps-bunyan-serializers-0.2.0.tgz"
    },
    "@pluralsight/ps-dvs-node": {
      "version": "3.1.0-beta.9",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/@pluralsight/ps-dvs-node/-/@pluralsight/ps-dvs-node-3.1.0-beta.9.tgz"
    },
    "@pluralsight/ps-kafka-node": {
      "version": "2.5.1",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/@pluralsight/ps-kafka-node/-/@pluralsight/ps-kafka-node-2.5.1.tgz"
    },
    "@pluralsight/ps-redis-node": {
      "version": "1.1.1",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/@pluralsight/ps-redis-node/-/ps-redis-node-1.1.1.tgz"
    },
    "@pluralsight/ps-vault-kubernetes": {
      "version": "1.0.1",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/@pluralsight/ps-vault-kubernetes/-/@pluralsight/ps-vault-kubernetes-1.0.1.tgz"
    },
    "@pluralsight/ps-web-logging": {
      "version": "0.3.1",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/@pluralsight/ps-web-logging/-/@pluralsight/ps-web-logging-0.3.1.tgz"
    },
    "@types/amqplib": {
      "version": "0.5.13",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/@types/amqplib/-/amqplib-0.5.13.tgz"
    },
    "@types/chai-as-promised": {
      "version": "7.1.2",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/@types/chai-as-promised/-/chai-as-promised-7.1.2.tgz"
    },
    "@types/chai": {
      "version": "4.2.10",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/@types/chai/-/chai-4.2.10.tgz"
    },
    "@types/mocha": {
      "version": "7.0.2",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/@types/mocha/-/mocha-7.0.2.tgz"
    },
    "@types/node": {
      "version": "10.14.22",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/@types/node/-/node-10.14.22.tgz"
    },
    "@types/pg": {
      "version": "7.14.7",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/@types/pg/-/pg-7.14.7.tgz"
    },
    "@types/sinon-chai": {
      "version": "3.2.3",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/@types/sinon-chai/-/sinon-chai-3.2.3.tgz"
    },
    "@types/sparkpost": {
      "version": "2.1.4",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/@types/sparkpost/-/sparkpost-2.1.4.tgz"
    },
    "@typescript-eslint/eslint-plugin": {
      "version": "4.14.0",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/@typescript-eslint/eslint-plugin/-/eslint-plugin-4.14.0.tgz"
    },
    "@typescript-eslint/parser": {
      "version": "4.14.0",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/@typescript-eslint/parser/-/parser-4.14.0.tgz"
    },
    "amqplib": {
      "version": "0.5.5",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/amqplib/-/amqplib-0.5.5.tgz"
    },
    "aws-sdk": {
      "version": "2.771.0",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/aws-sdk/-/aws-sdk-2.771.0.tgz"
    },
    "axios": {
      "version": "0.21.1",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/axios/-/axios-0.21.1.tgz"
    },
    "bunyan": {
      "version": "1.8.12",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/bunyan/-/bunyan-1.8.12.tgz"
    },
    "chai-as-promised": {
      "version": "7.1.1",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/chai-as-promised/-/chai-as-promised-7.1.1.tgz"
    },
    "chai-exclude": {
      "version": "2.0.2",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/chai-exclude/-/chai-exclude-2.0.2.tgz"
    },
    "chai": {
      "version": "4.2.0",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/chai/-/chai-4.2.0.tgz"
    },
    "dotenv": {
      "version": "8.2.0",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/dotenv/-/dotenv-8.2.0.tgz"
    },
    "eslint-config-prettier": {
      "version": "7.2.0",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/eslint-config-prettier/-/eslint-config-prettier-7.2.0.tgz"
    },
    "eslint-plugin-chai-friendly": {
      "version": "0.6.0",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/eslint-plugin-chai-friendly/-/eslint-plugin-chai-friendly-0.6.0.tgz"
    },
    "eslint-plugin-import": {
      "version": "2.22.1",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/eslint-plugin-import/-/eslint-plugin-import-2.22.1.tgz"
    },
    "eslint-plugin-mocha": {
      "version": "8.0.0",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/eslint-plugin-mocha/-/eslint-plugin-mocha-8.0.0.tgz"
    },
    "eslint-plugin-prettier": {
      "version": "3.3.1",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/eslint-plugin-prettier/-/eslint-plugin-prettier-3.3.1.tgz"
    },
    "eslint-plugin-react": {
      "version": "7.22.0",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/eslint-plugin-react/-/eslint-plugin-react-7.22.0.tgz"
    },
    "eslint": {
      "version": "7.18.0",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/eslint/-/eslint-7.18.0.tgz"
    },
    "firebase-admin": {
      "version": "9.2.0",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/firebase-admin/-/firebase-admin-9.2.0.tgz"
    },
    "husky": {
      "version": "4.2.3",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/husky/-/husky-4.2.3.tgz"
    },
    "jsdom": {
      "version": "16.2.0",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/jsdom/-/jsdom-16.2.0.tgz"
    },
    "jsonwebtoken": {
      "version": "8.5.1",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/jsonwebtoken/-/jsonwebtoken-8.5.1.tgz"
    },
    "knex": {
      "version": "0.21.16",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/knex/-/knex-0.21.16.tgz"
    },
    "koa-router": {
      "version": "7.2.1",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/koa-router/-/koa-router-7.2.1.tgz"
    },
    "launchdarkly-node-server-sdk": {
      "version": "5.11.2",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/launchdarkly-node-server-sdk/-/launchdarkly-node-server-sdk-5.11.2.tgz"
    },
    "lint-staged": {
      "version": "10.0.8",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/lint-staged/-/lint-staged-10.0.8.tgz"
    },
    "lodash.chunk": {
      "version": "4.2.0",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/lodash.chunk/-/lodash.chunk-4.2.0.tgz"
    },
    "mandrill-api": {
      "version": "1.0.45",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/mandrill-api/-/mandrill-api-1.0.45.tgz"
    },
    "mocha-teamcity-reporter": {
      "version": "3.0.0",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/mocha-teamcity-reporter/-/mocha-teamcity-reporter-3.0.0.tgz"
    },
    "mocha": {
      "version": "7.1.1",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/mocha/-/mocha-7.1.1.tgz"
    },
    "newrelic": {
      "version": "7.5.0",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/newrelic/-/newrelic-7.5.0.tgz"
    },
    "pg": {
      "version": "8.5.1",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/pg/-/pg-8.5.1.tgz"
    },
    "prettier": {
      "version": "1.19.1",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/prettier/-/prettier-1.19.1.tgz"
    },
    "rabbot": {
      "version": "2.1.0",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/rabbot/-/rabbot-2.1.0.tgz"
    },
    "sinon-chai": {
      "version": "3.5.0",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/sinon-chai/-/sinon-chai-3.5.0.tgz"
    },
    "sinon": {
      "version": "7.5.0",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/sinon/-/sinon-7.5.0.tgz"
    },
    "sparkpost": {
      "version": "2.1.4",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/sparkpost/-/sparkpost-2.1.4.tgz"
    },
    "sql-template-strings": {
      "version": "2.2.2",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/sql-template-strings/-/sql-template-strings-2.2.2.tgz"
    },
    "supertest": {
      "version": "3.0.0",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/supertest/-/supertest-3.0.0.tgz"
    },
    "timekeeper": {
      "version": "2.2.0",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/timekeeper/-/timekeeper-2.2.0.tgz"
    },
    "ts-node": {
      "version": "7.0.1",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/ts-node/-/ts-node-7.0.1.tgz"
    },
    "typescript": {
      "version": "4.1.3",
      "resolved": "http://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/typescript/-/typescript-4.1.3.tgz"
    },
    "uuid": {
      "version": "7.0.2",
      "resolved": "https://repository.vnerd.com/artifactory/api/npm/npm-pluralsight/uuid/-/uuid-7.0.2.tgz"
    }
  }
}
