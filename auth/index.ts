import express from 'express';

const app = express();

app.get('/auth', (request, response) => {
    response.json(true);
});

app.get('/auth/try', (request, response) => {
    response.status(403).send();
});

app.listen(4000, () => {
    console.log('Listening on port 4000');
});
