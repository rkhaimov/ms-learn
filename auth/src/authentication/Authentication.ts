import { IUserFromFormAndStorage, IPublicUser, IUsersStorage } from './types';
import { IStorage } from '@ms-learn/setup/shared';

export class Authentication {
    static UNAUTHORIZED = '401';

    constructor(private storage: IStorage<IUsersStorage>) {}

    async register(user: IUserFromFormAndStorage) {
        const users = await this.storage.get('users');

        return this.storage.set('users', users.concat(user));
    }

    async login({ password }: IUserFromFormAndStorage): Promise<string> {
        const users = await this.storage.get('users');
        const current = users.find(user => user.password === password);

        if (current === undefined) {
            throw new Error(Authentication.UNAUTHORIZED);
        }

        const prepared = { name: current.name };

        return Promise.resolve(this.encode(prepared));
    }

    parse(token?: string): IPublicUser {
        if (token === undefined) {
            throw new Error(Authentication.UNAUTHORIZED);
        }

        const decoded = Buffer.from(token, 'base64');

        return JSON.parse(decoded.toString());
    }

    private encode(user: IPublicUser): string {
        const stringified = JSON.stringify(user);

        return new Buffer(stringified).toString('base64');
    }
}
