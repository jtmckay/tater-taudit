import {
  divideAndConquer,
  isItGreaterOrEqual,
  fillViableVersions,
  flattenDependentTree,
  isValidVersion,
  buildTree,
  fillTreeViability,
  sortFlatDependentTree,
  upgradePackages,
  upgradeMajorPackages,
  filterResults,
  filterSeverity,
  cleanPackageVersion
} from '../yarnAudit'
import { testFlatTree, testNpmList, testYarnAudit } from './testData'

describe('isValidVersion', () => {
  describe('when given a major version higher than acceptable', () => {
    it('returns true', () => expect(isValidVersion('1.0.0', '0.0.0')).toBe(true))
  });
  describe('when given a minor version higher than acceptable', () => {
    it('returns true', () => expect(isValidVersion('0.1.0', '0.0.0')).toBe(true))
  });
  describe('when given a patch version higher than acceptable', () => {
    it('returns true', () => expect(isValidVersion('0.0.1', '0.0.0')).toBe(true))
  });
  describe('when given the same acceptable version', () => {
    it('returns true', () => expect(isValidVersion('0.0.0', '0.0.0')).toBe(true))
  });
  describe('when given a patch version lower than acceptable', () => {
    it('returns false', () => expect(isValidVersion('1.1.0', '1.1.1')).toBe(false))
  });
  describe('when given a minor version lower than acceptable', () => {
    it('returns false', () => expect(isValidVersion('1.0.1', '1.1.1')).toBe(false))
  });
  describe('when given a major version lower than acceptable', () => {
    it('returns false', () => expect(isValidVersion('0.1.1', '1.1.1')).toBe(false))
  });
  describe('when given a major version lower than acceptable with a caret', () => {
    it('returns false', () => expect(isValidVersion('^0.1.1', '1.1.1')).toBe(false))
  });
  describe('when given a minor version lower than acceptable with a caret', () => {
    it('returns true', () => expect(isValidVersion('^1.0.1', '1.1.1')).toBe(true))
  });
  describe('when given a patch version is x', () => {
    it('returns true', () => expect(isValidVersion('1.1.x', '1.1.1')).toBe(true))
  });
  describe('when given a minor version is x', () => {
    it('returns true', () => expect(isValidVersion('1.x.0', '1.1.1')).toBe(true))
  });
  describe('when given multiple ranges of acceptable versions', () => {
    it('returns true', () => expect(isValidVersion('1.x.0', '>=1.1.1 or >=2.0.0')).toBe(true))
  });
  describe('when given multiple ranges of acceptable versions are the same', () => {
    it('returns true', () => expect(isValidVersion('1.1.1', '>=1.1.1 or >=2.0.0')).toBe(true))
  });
})

describe('isItGreaterOrEqual', () => {
  describe('when given a major version higher than acceptable', () => {
    it('returns true', () => expect(isItGreaterOrEqual([1, 0, 0], [0, 0, 0])).toBe(true))
  });
  describe('when given a minor version higher than acceptable', () => {
    it('returns true', () => expect(isItGreaterOrEqual([0, 1, 0], [0, 0, 0])).toBe(true))
  });
  describe('when given a patch version higher than acceptable', () => {
    it('returns true', () => expect(isItGreaterOrEqual([0, 0, 1], [0, 0, 0])).toBe(true))
  });
  describe('when given the same acceptable version', () => {
    it('returns true', () => expect(isItGreaterOrEqual([0, 0, 0], [0, 0, 0])).toBe(true))
  });
  describe('when given a patch version lower than acceptable', () => {
    it('returns false', () => expect(isItGreaterOrEqual([1, 1, 0], [1, 1, 1])).toBe(false))
  });
  describe('when given a minor version lower than acceptable', () => {
    it('returns false', () => expect(isItGreaterOrEqual([1, 0, 1], [1, 1, 1])).toBe(false))
  });
  describe('when given a major version lower than acceptable', () => {
    it('returns false', () => expect(isItGreaterOrEqual([0, 1, 1], [1, 1, 1])).toBe(false))
  });
  describe('when given a patch version is x', () => {
    it('returns true', () => expect(isItGreaterOrEqual([1, 1, 'x'], [1, 1, 1])).toBe(true))
  });
  describe('when given a minor version is x', () => {
    it('returns true', () => expect(isItGreaterOrEqual([1, 'x', 0], [1, 1, 1])).toBe(true))
  });
  describe('when given a greater major version', () => {
    it('returns true', () => expect(isItGreaterOrEqual([4, 0, 0], [2, 1, 0])).toBe(true))
  });
  describe('when given a greater major version', () => {
    it('returns false', () => expect(isItGreaterOrEqual(['1', '9', '1'], ['1', '14', '7'])).toBe(false))
  });
})

describe('buildTree', () => {
  it('returns the reverse dependency tree (dependent tree)', async () => expect(await buildTree([testYarnAudit])).toEqual([
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
       "severity": "low",
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
       "severity": "low",
       "version": "2.8.0"
    }
 ]))
})

describe('divideAndConquer', () => {
  it('does nothing if there is nothing to do', async () => {
    expect(await divideAndConquer([], async (number) => number >= 4)).toBe(undefined)
  })
  it('returns the number I am thinking of', async () => {
    expect(await divideAndConquer([1, 2, 3, 4, 5, 6, 7], async (number) => number >= 4)).toBe(4)
  })
  it('calls the verify function fewer than the total number of options', async () => {
    let verifyCount = 0
    await divideAndConquer([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], async (number) => {
      verifyCount++
      return number >= 4
    })
    expect(verifyCount).toBe(5)
  })
  it('calls the verify function far fewer than the total number of options', async () => {
    let verifyCount = 0
    await divideAndConquer(new Array(1000).fill('').map((item, index) => index), async (number) => {
      verifyCount++
      return number >= 99
    })
    expect(verifyCount).toBe(11)
  })
  it('returns undefined if no match', async () => {
    expect(await divideAndConquer(new Array(10).fill('').map((item, index) => index), async () => {
      return false
    })).toBe(undefined)
  })
})

describe.skip('fillViableVersions', () => {
  const test = {
    "name": "css-select",
    "dependents": [{name: 'svgo', dependents: []}]
  }
  const yarnInfo = {
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
  }
  it('returns with package info', async () => {
    await fillViableVersions(test, {
      "name": "css-what",
      "patchedVersions": ">=5.0.1",
      "dependents": []
    }, yarnInfo, testNpmList)
    expect(test).toEqual({
      "name": "css-select",
      "earliestExistingVersion": "2.1.0",
      "minimumViableVersion": "4.0.0",
      "recommendedViableVersion": "4.1.3",
      "latestViableVersion": "4.1.3",
      "dependents": [
        {
          name: 'svgo',
          dependents: []
        }
      ]
    })
  })
})


describe.skip('fillTreeViability', () => {
  const test = [{
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
  }]
  const yarnInfo = {
    "type": "tree",
    "data": {
      "type": "list",
      "trees": [
        {
          "name": "css-what@3.4.2",
          "children": [
            {
              "name": "css-what@^3.2.1",
              "color": "dim",
              "shadow": true
            },
          ],
          "hint": null,
          "color": null,
          "depth": 0
        },
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
  }
  it('returns with package info', async () => {
    await fillTreeViability(test, yarnInfo, {
      name: 'test',
      version: '0.0.0',
      dependencies: {
        '@pluralsight/ps-design-system-icon': { resolved: 'asdf', version: "1.0.1" }
      }
    })
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
                    "latestViableVersion": "23.1.15",
                    "recommendedViableVersion": "23.1.15",
                    "minimumViableVersion": "2.0.2"
                  }
                ],
                "latestViableVersion": "2.3.1",
                "recommendedViableVersion": "2.3.1",
                "minimumViableVersion": "0.0.1-2"
              }
            ],
            "earliestExistingVersion": "2.1.0",
            "latestViableVersion": "4.1.3",
            "recommendedViableVersion": "4.1.3",
            "minimumViableVersion": "4.0.0"
          }
        ],
        "earliestExistingVersion": "3.4.2",
        "latestViableVersion": "5.0.1",
        "recommendedViableVersion": "5.0.1",
        "minimumViableVersion": "5.0.1"
      }
    ])
  }, 30000)
})

describe('flattenDependentTree', () => {
  it('returns an flat list of dependents to work through', () => {
    expect(flattenDependentTree([
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
   ])
  })
})

describe('sortFlatDependentTree', () => {
  it('returns the flat list in the proper order', () => {
    expect(sortFlatDependentTree([
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
    ])
  })

  it('sorts it properly', () => {
    expect(sortFlatDependentTree(testFlatTree).map(i => `${i.name}@${i.recommendedViableVersion || i.version}`)).toEqual([
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
    ])
  })
})

describe('upgradePackage', () => {
  it('logs the expected commands during a dry run', () => {
    const commandList: Array<string> = []
    upgradePackages((command: string) => commandList.push(command), false, [
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
    ])
    expect(commandList).toEqual(["yarn upgrade css-what"])
  })
})

describe('upgradeMajorPackages', () => {
  it('logs the expected commands during a dry run', () => {
    const commandList: Array<string> = []
    upgradeMajorPackages((command: string) => commandList.push(command), false, [
      {
        "dependents": [],
        "name": "@pluralsight/ps-design-system-icon",
        "recommendedViableVersion": "2.0.7",
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
      {name: '@pluralsight/ps-design-system-icon', version: '^1.2.99'}
    ])
    expect(commandList).toEqual(["yarn add @pluralsight/ps-design-system-icon@^2.0.7 -W"])
  })

  it('logs the expected commands during a dry run', () => {
    const commandList: Array<string> = []
    upgradeMajorPackages((command: string) => commandList.push(command), false, [
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
      {name: '@pluralsight/ps-design-system-icon', version: '^0.2.99'}
    ])
    expect(commandList).toEqual(["yarn add @pluralsight/ps-design-system-icon@^2.0.5 -W"])
  })

  it('when the current version is a major version greater, it uses the latest of that major version', () => {
    const commandList: Array<string> = []
    upgradeMajorPackages((command: string) => commandList.push(command), false, [
      {
        "dependents": [],
        "name": "@pluralsight/ps-design-system-icon",
        "recommendedViableVersion": "1.0.1",
        "minimumViableVersion": "0.0.1",
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
      {name: '@pluralsight/ps-design-system-icon', version: '^1.0.0'}
    ])
    expect(commandList).toEqual(["yarn add @pluralsight/ps-design-system-icon@^1.0.1 -W"])
  })
})

describe('filterResults', () => {
  it('filters a viable tree to include only branches with the given text', () => {
    expect(filterResults([
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
   ], 'svgo')).toEqual([
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
      }
    ])
  })
})

describe('filterSeverity', () => {
  it('filters a viable tree to include only branches with the given text', () => {
    expect(filterSeverity([
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
         "severity": "high",
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
         "severity": "low",
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
         "severity": "moderate",
         "recommendedViableVersion": "2.3.1"
      },
      {
         "dependents": [],
         "latestViableVersion": "23.1.14",
         "minimumViableVersion": "2.0.2",
         "name": "@pluralsight/ps-design-system-icon",
         "severity": "low",
         "recommendedViableVersion": "23.1.14"
      }
   ], { critical: true })).toEqual([
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
         "severity": "high",
         "patchedVersions": ">=5.0.1",
         "version": "3.4.2"
      }
    ])
  })
})

describe('cleanPackageVersion', () => {
  it('returns useful package version', () => {
    expect(cleanPackageVersion('1.14.7')).toEqual([1, 14, 7])
  })
  it('returns useful package version', () => {
    expect(cleanPackageVersion('1.0.0')).toEqual([1, 0, 0])
  })
  it('returns useful package version', () => {
    expect(cleanPackageVersion('>=2.0.3')).toEqual([2, 0, 3])
  })
})
