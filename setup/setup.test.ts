import { Setup } from './src/Setup';
import { IPackageJSON, IPackageParser, PackageType } from './src/types';
import { getLastReturn } from './shared/test-utils';

describe('After installing procedure it is determining package purpose and setups all necessary configurations', () => {
    it('should copy files from certain presets folder to packages folder', () => {
        const { parser, setup } = initialize();
        parser.getPackageJSON.mockReturnValue({ type: PackageType.Server } as IPackageJSON);

        setup.do();

        expect(parser.copyServerPresetsTo).toHaveBeenCalledWith(getLastReturn(parser.getWorkDir));
        expect(parser.copyClientPresetsTo).not.toHaveBeenCalled();
    });

    it('should setup client', () => {
        const { parser, setup } = initialize();
        parser.getPackageJSON.mockReturnValue({ type: PackageType.Client } as IPackageJSON);

        setup.do();

        expect(parser.copyClientPresetsTo).toHaveBeenCalledWith(getLastReturn(parser.getWorkDir));
        expect(parser.copyServerPresetsTo).not.toHaveBeenCalled();
    });

    it('should throw when type does not exists', () => {
        const { parser, setup } = initialize();
        parser.getPackageJSON.mockReturnValue({});

        expect(() => setup.do()).toThrow();
    });
});

function initialize() {
    const parser = new PackageParser();

    return {
        parser,
        setup: new Setup(parser),
    };
}

class PackageParser implements IPackageParser {
    getPackageJSON = jest.fn();
    copyClientPresetsTo = jest.fn();
    copyServerPresetsTo = jest.fn();
    getWorkDir = jest.fn(() => 'DIR');
}
