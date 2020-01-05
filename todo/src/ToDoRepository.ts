import { IStorage, IToDoFromStorage, IToDoRepository, IToDoStorage } from './types';

export class ToDoRepository implements IToDoRepository {
    constructor(private storage: IStorage<IToDoStorage>) {}

    async create(todo: IToDoFromStorage) {
        const todos = await this.storage.get('todos');

        this.storage.set('todos', todos.concat(todo));
    }

    getAll(): Promise<IToDoFromStorage[]> {
        return Promise.resolve(this.storage.get('todos'));
    }

    getById(id: IToDoFromStorage['id']) {
        return this.getAll()
            .then(todos => todos.find(todo => todo.id === id));
    }
}
