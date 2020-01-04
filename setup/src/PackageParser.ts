import path from 'path';
import fs from 'fs';
import { IPackageJSON, IPackageParser } from './types';

export class PackageParser implements IPackageParser {
    copyClientPresetsTo(to: string): void {
        throw new Error('Not implemented');
    }

    copyServerPresetsTo(to: string): void {
        PATHS.SERVER.forEach(configPath => fs.copyFileSync(configPath, path.resolve(to, path.basename(configPath))));
    }

    getPackageJSON(): IPackageJSON {
        return require(path.resolve(this.getWorkDir(), 'package.json'));
    }

    getWorkDir(): string {
        return process.env.INIT_CWD as string;
    }
}

const BASE = path.resolve(__dirname, '..', 'presets');

const PATHS = {
    SERVER: [
        path.resolve(BASE, 'server', 'Dockerfile'),
        path.resolve(BASE, 'server', 'tsconfig.json'),
        path.resolve(BASE, 'server', 'tslint.json'),
        path.resolve(BASE, 'jest.config.js'),
    ],
    CLIENT: [],
};
