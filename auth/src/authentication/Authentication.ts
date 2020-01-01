import { CreateTokenFunc, HashPasswordFunc, IUser, IUserRepository } from './types';

export class Authentication {
    constructor(
        private repository: IUserRepository,
        private hashPassword: HashPasswordFunc,
        private createToken: CreateTokenFunc,
    ) {}

    authenticate(name: IUser['name'], password: IUser['password']): Promise<string> {
        const hashed = this.hashPassword(password);

        return this.repository.getByCredentials(name, hashed)
            .then(user => this.createToken(user));
    }
}
