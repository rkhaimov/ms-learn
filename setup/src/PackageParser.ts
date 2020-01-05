import path from 'path';
import fs from 'fs';
import { IPackageJSON, IPackageParser } from './types';

export class PackageParser implements IPackageParser {
    constructor(private packagePath: string, private setupPath: string) {}

    copyClientPresets(): void {
        throw new Error('Not implemented');
    }

    copyServerPresets(): void {
        this.getPaths()
            .SERVER.forEach(configPath => fs.copyFileSync(configPath, path.resolve(this.packagePath, path.basename(configPath))));
    }

    getPackageJSON(): IPackageJSON {
        return require(path.resolve(this.packagePath, 'package.json'));
    }

    private getPaths() {
        const BASE = path.resolve(this.setupPath, 'presets');

        return {
            SERVER: [
                path.resolve(BASE, 'server', 'Dockerfile'),
                path.resolve(BASE, 'server', 'tsconfig.json'),
                path.resolve(BASE, 'server', 'tslint.json'),
                path.resolve(BASE, 'jest.config.js'),
            ],
            CLIENT: [],
        };
    }
}
