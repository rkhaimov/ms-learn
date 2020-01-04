export interface IPackageParser {
    getPackageJSON(): IPackageJSON;
    getWorkDir(): string;
    copyServerPresetsTo(path: string): void;
    copyClientPresetsTo(path: string): void;
}

export interface IPackageJSON { type: PackageType; }

export enum PackageType {
    Server = 'server',
    Client = 'client',
}
