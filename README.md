# Security vulnerability assistant


Resolve security vulnerabilities found with yarn audit (Dependabot or npm audit). Automatically fix them when possible, and get assistance when not. It will walk the tree of dependencies to find the best path forward.

## Getting Started

Find what packages need to be updated. This command will log commands that could be used to potentially resolve vulnerabilities:

```
npx tater-taudit@latest fix
```

Example output:
```
yarn upgrade svgo
yarn upgrade css-select
```

Automatically run the recommended commands by passing "-a":

```
npx tater-taudit@latest fix -a
```

## When you want details

The "log" command will give you the details of your project vulnerabilities and potential routes to fix. This is sometimes the best path forward to resolve dependencies that haven't made it up the tree to their parents yet.

```
npx tater-taudit@latest log
```
Example output:
```
{
  "name": "css-what",
  "patchedVersions": ">=5.0.1",
  "dependents": [
    {
      "name": "css-select",
      "dependents": [
        {
          "name": "svgo",
          "dependents": [],
          "earliestExistingVersion": "1.3.2",
          "latestViableVersion": "2.3.1",
          "recommendedViableVersion": "2.3.1",
          "minimumViableVersion": "2.3.1"
        }
      ],
      "earliestExistingVersion": "0.1.1",
      "latestViableVersion": "4.1.3",
      "recommendedViableVersion": "4.1.3",
      "minimumViableVersion": "4.0.0"
    }
  ],
  "version": "3.4.2"
}
```

This example tells us that css-what is vulnerable, and patched in versions >=5.0.1, but that we are using a vulnerable version "3.4.2". Then it shows us that css-select is the package depending on css-what, but that it has a version that resolves it starting in version "4.0.0". It finds that "4.1.3" is the latest version and recommends that.

It then continues to svgo, which depends on css-select, and so on. Using the fix command, you will end up with an upgrade command for each dependency found here with a viable version, and an install/add for each top level dependency with a viable version.

If there is a fix available starting with multiple major versions, it will attempt to use the major version that you are currently using, before recommending the latest version.

## Options
```
  -a, --all            Run all available fixes automatically
  -d, --dry            Log commands that would effect the repo
                       instead of running them
  -m, --major_upgrade  Attempt to install newer versions (perhaps
                       major; breaking changes)
  -n, --npm            Replace yarn with npm in output commands
  -u, --upgrade        Upgrade audit dependencies with a fix
                       available
  -h, --help           display help for command

  Examples:
    $ tater-taudit fix
      -- Runs all available fixes but only logs the commands that would be run
    $ tater-taudit fix -a
      -- Runs all available fixes
    $ tater-taudit fix -d
      -- Only logs the commands that would be run
    $ tater-taudit fix -u
      -- Upgrades all dependents down to the lowest dependency found in the audit with a dependency that has a fix available
    $ tater-taudit fix -m
      -- Upgrades all top level dependencies with a fix available that is not permitted by the current locked version
```