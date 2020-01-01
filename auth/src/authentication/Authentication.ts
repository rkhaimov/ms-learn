import { IAuthToken, IUser, IUserRepository, Throw403Fun } from './types';
import { UnknownFunc } from '../misc/types-utils';

export class Authentication {
    constructor(
        private repository: IUserRepository,
        private authToken: IAuthToken,
        private throw401: Throw403Fun,
    ) {}

    authenticate(name: IUser['name'], password: IUser['password']): Promise<string | unknown> {
        const hashed = this.authToken.hash(password);

        return this.repository.getByCredentials(name, hashed)
            .then(user => this.authToken.create(user))
            .catch(() => this.throw401());
    }

    authenticateFromToken(token: string, pass: UnknownFunc, deny: UnknownFunc): void {
        if (this.authToken.hasExpired(token)) {
            deny();
        } else {
            pass();
        }
    }
}
