import { ToDo } from './ToDo';
import { IToDoFromStorage, IToDoRepository, IToDoStorage } from './types';
import { InMemStorage } from './InMemStorage';
import { ToDoRepository } from './ToDoRepository';
import { genString } from '../../setup/shared';

describe('ToDo is in charge of manipulating to do items', () => {
    it('should add todo item with uniq id', async () => {
        const { todo, repository } = setup();
        const expectedTodo = { description: genString() };

        const created = await todo.create(expectedTodo);
        const inStorage = await repository.getById(created.id);

        expect(inStorage).toEqual(created);
    });
});

function setup() {
    const storage = new InMemStorage<IToDoStorage>({ todos: [] });
    const repository = new ToDoRepository(storage);
    const todo = new ToDo(repository);

    return {
        storage,
        repository,
        todo,
    };
}
