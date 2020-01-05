import { IToDoFromForm, IToDoFromStorage, IToDoRepository } from './types';

export class ToDo {
    constructor(private repository: IToDoRepository) {}

    getAll() {
        return this.repository.getAll();
    }

    create(todo: IToDoFromForm): Promise<IToDoFromStorage> {
        const created = { id: 1, description: todo.description };

        return this.repository.create(created)
            .then(() => created);
    }
}
