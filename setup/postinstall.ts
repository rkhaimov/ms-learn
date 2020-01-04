import { Setup } from './src/Setup';
import { PackageParser } from './src/PackageParser';

const parser = new PackageParser();
const setup = new Setup(parser);

setup.do();
