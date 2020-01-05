import { ToDo } from './ToDo';
import { IToDoFromForm, IToDoStorage } from './types';
import { InMemStorage } from './InMemStorage';
import { ToDoRepository } from './ToDoRepository';
import { genString } from '../../setup/shared';

describe('ToDo is in charge of manipulating to do items', () => {
    it('should add, getById and getAll todo item', async () => {
        const { todo } = setup();
        const expectedTodo = { description: genString() };

        verifyWasCreated(expectedTodo, todo);
    });

    it('should add todo item with uniq id', async () => {
        const { todo } = setup();

        await verifyWasCreated({ description: genString() }, todo);
        await verifyWasCreated({ description: genString() }, todo);
    });

    async function verifyWasCreated(toCreate: IToDoFromForm, todo: ToDo) {
        await todo.create({ description: genString() })
            .then(async created => {
                const actual = await todo.getById(created.id);

                expect(actual).toBe(created);
            });
    }
});

function setup() {
    const storage = new InMemStorage<IToDoStorage>({ todos: [] });
    const repository = new ToDoRepository(storage);
    const todo = new ToDo(repository);

    return {todo};
}
