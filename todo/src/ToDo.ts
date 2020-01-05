import { IToDoFromForm, IToDoFromStorage, IToDoRepository } from './types';

export class ToDo {
    constructor(private repository: IToDoRepository) {}

    getAll() {
        return this.repository.getAll();
    }

    getById(id: IToDoFromStorage['id']) {
        return this.repository.getById(id);
    }

    async create(todo: IToDoFromForm): Promise<IToDoFromStorage> {
        const todos = await this.getAll();
        const created = { id: todos.length, description: todo.description };

        return this.repository.create(created)
            .then(() => created);
    }
}
