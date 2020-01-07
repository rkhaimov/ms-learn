import { IUserFromStorage, IPublicUser, IUsersStorage } from './types';
import { IStorage } from '@ms-learn/setup/shared';

export class Authentication {
    static USER_NOT_FOUND = '401';

    constructor(private storage: IStorage<IUsersStorage>) {}

    async register(name: IUserFromStorage['name'], password: IUserFromStorage['password']) {
        const users = await this.storage.get('users');

        return this.storage.set('users', users.concat({ name, password } as IUserFromStorage));
    }

    async login(name: IUserFromStorage['name'], password: IUserFromStorage['password']): Promise<string> {
        const users = await this.storage.get('users');
        const current = users.find(user => user.password === password);

        if (current === undefined) {
            throw new Error(Authentication.USER_NOT_FOUND);
        }

        const prepared = { name: current.name };

        return Promise.resolve(this.encode(prepared));
    }

    parse(token: string): IPublicUser {
        const decoded = Buffer.from(token, 'base64');

        return JSON.parse(decoded.toString());
    }

    private encode(user: IPublicUser): string {
        const stringified = JSON.stringify(user);

        return new Buffer(stringified).toString('base64');
    }
}
