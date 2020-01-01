import { CreateTokenFunc, HashPasswordFunc, IUser, IUserRepository, Throw403Fun } from './types';
import { UnknownFunc } from '../misc/types-utils';

export class Authentication {
    constructor(
        private repository: IUserRepository,
        private hashPassword: HashPasswordFunc,
        private createToken: CreateTokenFunc,
        private throw401: Throw403Fun,
        private hasExpired: (token: string) => unknown,
    ) {}

    authenticate(name: IUser['name'], password: IUser['password']): Promise<string | unknown> {
        const hashed = this.hashPassword(password);

        return this.repository.getByCredentials(name, hashed)
            .then(user => this.createToken(user))
            .catch(() => this.throw401());
    }

    authenticateFromToken(token: string, pass: UnknownFunc, deny: UnknownFunc): void {
        if (this.hasExpired(token)) {
            deny();
        } else {
            pass();
        }
    }
}
