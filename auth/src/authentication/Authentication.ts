import { CreateTokenFunc, HashPasswordFunc, IUser, IUserRepository, Throw403Fun } from './types';

export class Authentication {
    constructor(
        private repository: IUserRepository,
        private hashPassword: HashPasswordFunc,
        private createToken: CreateTokenFunc,
        private throw403: Throw403Fun,
    ) {}

    authenticate(name: IUser['name'], password: IUser['password']): Promise<string | unknown> {
        const hashed = this.hashPassword(password);

        return this.repository.getByCredentials(name, hashed)
            .then(user => this.createToken(user))
            .catch(() => this.throw403());
    }
}
