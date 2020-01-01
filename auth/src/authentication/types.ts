import { UnknownFunc } from '../misc/types-utils';

export interface IUserRepository {
    getByCredentials(name: IUser['name'], password: IUser['password']): Promise<IUser>;
}

export interface IAuthToken {
    create(user: IUser): string;
    hash(password: string): string;
    hasExpired(token: string): boolean;
}

export interface IUser {
    name: string;
    password: string;
}

export type Throw403Fun = UnknownFunc;
