import express from 'express';
import { InMemStorage } from '@ms-learn/setup/shared';
import { Authentication } from './src/authentication/Authentication';
import { IUserFromFormAndStorage, IUsersStorage } from './src/authentication/types';

const app = express();
const router = express.Router();
const storage = new InMemStorage<IUsersStorage>({ users: [] });
const auth = new Authentication(storage);

app.use(express.json());
app.use('/auth', router);

router.post<{}, {}, IUserFromFormAndStorage>('/register', (request, response) => {
    auth.register(request.body)
        .then(() => response.send());
});

router.post<{}, {}, IUserFromFormAndStorage>('/login', (request, response) => {
    auth.login(request.body)
        .then(response.json.bind(response));
});

router.get('/current', (request, response) => {
    response.json(auth.parse(request.headers.authorization));
});

app.listen(4000, () => {
    process.stdout.write('Listening on port 4000\n');
});
