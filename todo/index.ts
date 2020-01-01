import express from 'express';

const app = express();

app.get('/todo', (req, response) => {
    response.json([]);
});

app.listen(4001, () => {
    console.log('Listening on port 4001')
});
