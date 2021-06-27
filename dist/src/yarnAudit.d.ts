export declare type YarnAudit = {
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
};
export declare type NpmVersionInfo = {
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
};
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
export declare type PackageDependency = {
    name: string;
    version?: string;
    patchedVersions?: string;
    earliestExistingVersion?: string;
    earliestViableVersion?: string;
    recommendedViableVersion?: string;
    latestViableVersion?: string;
    dependents: Array<PackageDependency>;
};
declare type PackageInfo = {
    name: string;
    version: string;
    dependencies: {
        [key: string]: string;
    };
};
declare type PackageVersion = [
    string | number,
    string | number,
    string | number
];
export declare function isValidVersion(vulnerablePackageVersion: string, acceptablePackageVersion: string): boolean;
export declare function getYarnAudits(): Promise<Array<YarnAudit>>;
export declare function getYarnInfo(): Promise<YarnInfo>;
export declare function buildTree(yarnAudits: Array<YarnAudit>): Array<PackageDependency>;
export declare function getNpmPackageInfo(npmPackageName: string, npmPackageVersion?: string): Promise<PackageInfo | undefined>;
export declare function getVersions(npmPackage: PackageDependency): Promise<string[]>;
export declare function getVersionSearchTextForLatestSameMajorVersion(npmPackageVersion: string): string;
export declare function divideAndConquer<Type>(arrayToCheck: Array<Type>, validityCheck: (version: Type) => Promise<boolean>): Promise<Type | undefined>;
export declare function isItGreaterOrEqual([major, minor, patch]: PackageVersion, comparable: PackageVersion): boolean;
export declare function fillViableVersions(npmPackage: PackageDependency, dependency: PackageDependency, yarnInfo: YarnInfo): Promise<PackageDependency | undefined>;
export declare function fillTreeViability(tree: Array<PackageDependency>, yarnInfo: YarnInfo, npmPackageDependent?: PackageDependency, lowerDependency?: PackageDependency): Promise<Array<PackageDependency>>;
export declare function flattenDependentTree(tree: Array<PackageDependency>, maybeFlatTree?: Array<PackageDependency>): PackageDependency[];
export declare function sortFlatDependentTree(tree: Array<PackageDependency>): Array<PackageDependency>;
export declare function execute(command: string, json?: boolean, jsonLine?: boolean): Promise<any>;
export {};
