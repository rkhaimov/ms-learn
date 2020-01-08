export interface IUserFromFormAndStorage {
    name: string;
    password: string;
}

export interface IPublicUser {
    name: string;
}

export interface IUsersStorage {
    users: IUserFromFormAndStorage[];
}
