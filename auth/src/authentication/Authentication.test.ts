import { Authentication } from './Authentication';
import { InMemStorage } from '@ms-learn/setup/shared';
import { IUsersStorage } from './types';

describe('Authentication is in charge of verifying that given credentials is existing in the system', () => {
    it('should create new user', async () => {
        const { auth } = setup();

        await auth.register('name', 'password');
        const token = await auth.login('name', 'password');

        expect(token.includes('name')).toBeFalsy();
        expect(token.includes('password')).toBeFalsy();

        const user = await auth.parse(token);

        expect(user.name).toBe('name');
    });

    it('should not login not existed user', async () => {
        const { auth } = setup();

        try {
            await auth.login('name', 'password');
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
