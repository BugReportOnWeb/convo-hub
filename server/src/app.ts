import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.get('/', (_req, res) => {
    const response = { message: "Hello World!" };
    res.send(response);
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

