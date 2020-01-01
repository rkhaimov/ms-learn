import { Authentication } from './Authentication';
import { IAuthToken, IUserRepository } from './types';
import { createStringsGenerator } from '../misc/test-utils';

describe('Authentication is in charge of verifying that given credentials is existing in the system', () => {
    it('should login existing user', async () => {
        const {
            repository,
            authToken,
            authentication,
            userFromStorage,
            hashedPassword,
            userFromOutside,
            token,
        } = setup();

        repository.getByCredentials.mockResolvedValue(userFromStorage);
        authToken.hash.mockReturnValue(hashedPassword);
        authToken.create.mockReturnValue(token);

        const actualToken = await authentication.authenticate(userFromOutside.name, userFromOutside.password);

        expect(authToken.hash).toHaveBeenCalledWith(userFromOutside.password);
        expect(repository.getByCredentials).toHaveBeenCalledWith(userFromOutside.name, hashedPassword);
        expect(authToken.create).toHaveBeenCalledWith(userFromStorage);
        expect(actualToken).toBe(token);
    });

    it('should not login user but throw 401', async () => {
        const { repository, authentication, userFromOutside, throw401 } = setup();
        repository.getByCredentials.mockRejectedValue(undefined);

        await authentication.authenticate(userFromOutside.name, userFromOutside.password);

        expect(throw401).toHaveBeenCalled();
    });

    it('should verify user session', async () => {
        const { authentication, token, authToken, permit, deny } = setup();
        authToken.hasExpired.mockReturnValue(false);

        await authentication.authenticateFromToken(token, permit, deny);

        expect(permit).toHaveBeenCalled();
        expect(deny).not.toHaveBeenCalled();
    });

    it('should deny access when invalid session has been passed', async () => {
        const { authentication, token, authToken, permit, deny } = setup();
        authToken.hasExpired.mockReturnValue(true);

        await authentication.authenticateFromToken(token, permit, deny);

        expect(deny).toHaveBeenCalled();
        expect(permit).not.toHaveBeenCalled();
    });
});

function setup() {
    const getString = createStringsGenerator();
    const repository = new UserRepository();
    const authToken = new AuthToken();
    const throw401 = jest.fn();

    return {
        authentication: new Authentication(repository, authToken, throw401),
        repository,
        authToken,
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

class UserRepository implements IUserRepository {
    getByCredentials = jest.fn();
}

class AuthToken implements IAuthToken {
    create = jest.fn();
    hasExpired = jest.fn();
    hash = jest.fn();
}
