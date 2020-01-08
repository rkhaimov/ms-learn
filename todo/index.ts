import express from 'express';
import { InMemStorage } from '@ms-learn/setup/shared';
import { IToDoFromForm, IToDoStorage } from './src/types';
import { ToDoRepository } from './src/ToDoRepository';
import { ToDo } from './src/ToDo';

const app = express();
const router = express.Router();
const storage = new InMemStorage<IToDoStorage>({ todos: [] });
const repository = new ToDoRepository(storage);
const todo = new ToDo(repository);

app.use(express.json());
app.use('/todo', router);

router.get('/', (request, response) => {
    todo.getAll()
        .then(response.json.bind(response));
});

router.get<{ id: string }>('/:id', (request, response) => {
    todo.getById(request.params.id)
        .then(response.json.bind(response));
});

router.post<{}, {}, IToDoFromForm>('/', (request, response) => {
    todo.create(request.body)
        .then(response.json.bind(response));
});

app.listen(4001);
