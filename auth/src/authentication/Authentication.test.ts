import { InMemStorage } from '@ms-learn/setup/shared';
import { Authentication } from './Authentication';
import { IUserFromFormAndStorage, IUsersStorage } from './types';

describe('Authentication is in charge of verifying that given credentials is existing in the system', () => {
    const user: IUserFromFormAndStorage = { name: 'name', password: 'password' };

    it('should create new user', async () => {
        const { auth } = setup();

        await auth.register(user);
        const token = await auth.login(user);

        expect(token.includes('name')).toBeFalsy();
        expect(token.includes('password')).toBeFalsy();

        const parsed = await auth.parse(token);

        expect(parsed.name).toBe(user.name);
    });

    it('should not login not existed user', async () => {
        const { auth } = setup();

        try {
            await auth.login(user);
        } catch (_) {
            expect(true).toBeTruthy();
        }

        expect.hasAssertions();
    });

    it('should throw error when token is undefined', async () => {
        const { auth } = setup();

        try {
            await auth.parse(undefined);
        } catch (_) {
            expect(true).toBeTruthy();
        }

        expect.hasAssertions();
    });
});

function setup() {
    const storage = new InMemStorage<IUsersStorage>({ users: [] });
    const auth = new Authentication(storage);

    return { auth };
}
