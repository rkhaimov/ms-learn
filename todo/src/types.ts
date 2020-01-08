export interface IToDoRepository {
    getAll(): Promise<IToDoFromStorage[]>;
    getById(id: IToDoFromStorage['id']): Promise<IToDoFromStorage | undefined>;
    create(todo: IToDoFromStorage): Promise<void>;
}

export interface IToDoFromForm {
    description: string;
}

export interface IToDoFromStorage extends IToDoFromForm {
    id: string;
}

export interface IToDoStorage {
    todos: IToDoFromStorage[];
}
