import { Authentication } from './Authentication';
import { IUserRepository } from './types';
import { createStringsGenerator } from '../misc/test-utils';

describe('Authentication is in charge of verifying that given credentials is existing in the system', () => {
    it('should login existing user', async () => {
        const {
            repository,
            hashPassword,
            authentication,
            createToken,
            userFromStorage,
            hashedPassword,
            userFromOutside,
            expectedToken,
        } = setup();

        repository.getByCredentials.mockResolvedValue(userFromStorage);
        hashPassword.mockReturnValue(hashedPassword);
        createToken.mockReturnValue(expectedToken);

        const actualToken = await authentication.authenticate(userFromOutside.name, userFromOutside.password);

        expect(hashPassword).toHaveBeenCalledWith(userFromOutside.password);
        expect(repository.getByCredentials).toHaveBeenCalledWith(userFromOutside.name, hashedPassword);
        expect(createToken).toHaveBeenCalledWith(userFromStorage);
        expect(actualToken).toBe(expectedToken);
    });
});

function setup() {
    const getString = createStringsGenerator();
    const repository = new UserRepository();
    const hashPassword = jest.fn();
    const createToken = jest.fn();

    return {
        authentication: new Authentication(repository, hashPassword, createToken),
        createToken,
        hashPassword,
        repository,
        hashedPassword: getString(),
        expectedToken: getString(),
        userFromStorage: {
            name: getString(),
            password: getString(),
        },
        userFromOutside: {
            name: getString(),
            password: getString(),
        },
    };
}

export class UserRepository implements IUserRepository {
    getByCredentials = jest.fn();
}
