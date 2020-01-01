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
            token,
        } = setup();

        repository.getByCredentials.mockResolvedValue(userFromStorage);
        hashPassword.mockReturnValue(hashedPassword);
        createToken.mockReturnValue(token);

        const actualToken = await authentication.authenticate(userFromOutside.name, userFromOutside.password);

        expect(hashPassword).toHaveBeenCalledWith(userFromOutside.password);
        expect(repository.getByCredentials).toHaveBeenCalledWith(userFromOutside.name, hashedPassword);
        expect(createToken).toHaveBeenCalledWith(userFromStorage);
        expect(actualToken).toBe(token);
    });

    it('should not login user but throw 403', async () => {
        const { repository, authentication, userFromOutside, throw401 } = setup();
        repository.getByCredentials.mockRejectedValue(undefined);

        await authentication.authenticate(userFromOutside.name, userFromOutside.password);

        expect(throw401).toHaveBeenCalled();
    });

    it('should verify user from token', async () => {
        const { authentication, token, hasExpired, permit, deny } = setup();
        hasExpired.mockReturnValue(false);

        await authentication.authenticateFromToken(token, permit, deny);

        expect(permit).toHaveBeenCalled();
        expect(deny).not.toHaveBeenCalled();
    });

    it('should deny access when invalid token has been passed', async () => {
        const { authentication, token, hasExpired, permit, deny } = setup();
        hasExpired.mockReturnValue(true);

        await authentication.authenticateFromToken(token, permit, deny);

        expect(deny).toHaveBeenCalled();
        expect(permit).not.toHaveBeenCalled();
    });
});

function setup() {
    const getString = createStringsGenerator();
    const repository = new UserRepository();
    const hashPassword = jest.fn();
    const hasExpired = jest.fn();
    const createToken = jest.fn();
    const throw401 = jest.fn();

    return {
        authentication: new Authentication(repository, hashPassword, createToken, throw401, hasExpired),
        createToken,
        hasExpired,
        hashPassword,
        repository,
        throw401,
        hashedPassword: getString(),
        token: getString(),
        userFromStorage: {
            name: getString(),
            password: getString(),
        },
        userFromOutside: {
            name: getString(),
            password: getString(),
        },
        permit: jest.fn(),
        deny: jest.fn(),
    };
}

export class UserRepository implements IUserRepository {
    getByCredentials = jest.fn();
}
