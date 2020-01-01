export interface IUserRepository {
    getByCredentials(name: IUser['name'], password: IUser['password']): Promise<IUser>;
}

export interface IUser {
    name: string;
    password: string;
}

export type HashPasswordFunc = (password: string) => string;
export type CreateTokenFunc = (user: IUser) => string;
export type Throw403Fun = () => unknown;
