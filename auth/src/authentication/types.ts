export interface IUserFromStorage {
    name: string;
    password: string;
}

export interface IPublicUser {
    name: string;
}

export interface IUsersStorage {
    users: IUserFromStorage[];
}
