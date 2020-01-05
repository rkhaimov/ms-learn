export interface IToDoRepository {
    getAll(): Promise<IToDoFromStorage[]>;
    getById(id: IToDoFromStorage['id']): Promise<IToDoFromStorage | undefined>;
    create(todo: IToDoFromStorage): Promise<void>;
}

export interface IToDoFromForm {
    description: string;
}

export interface IToDoFromStorage extends IToDoFromForm {
    id: number;
}

export interface IStorage<TStorage> {
    set(key: keyof TStorage, value: unknown): Promise<void>;

    get<TKey extends keyof TStorage>(key: TKey): Promise<TStorage[TKey]>;
}

export interface IToDoStorage {
    todos: IToDoFromStorage[];
}
