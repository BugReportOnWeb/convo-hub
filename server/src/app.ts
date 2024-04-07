import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import * as dotenv from 'dotenv';
dotenv.config();

import {
    addUserQuery,
    removeUserQuery,
    createUserTable
} from './db/query';
import { userRouter } from './routes/user';
import { User } from './types/user';

const HOST = process.env.HOST ?? 'localhost';
const CLIENT_PORT = process.env.CLIENT_PORT ?? 5173;
const SERVER_PORT = process.env.SERVER_PORT ?? 4000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: `http://${HOST}:${CLIENT_PORT}`
    }
});

app.use(cors());
app.use('/v1/users', userRouter);

app.get('/health', (_req, res) => {
    const response = { health: "OK" };
    res.send(response);
})

io.on('connection', socket => {
    let currUsername = '';

    socket.on('userJoined', async (username) => {
        console.log(`${socket.id} joined`);
        const newUser: User = { id: socket.id, username };

        try {
            await createUserTable();
            await addUserQuery(newUser);

            currUsername = username;
            io.emit('userJoined', currUsername);
        } catch (error) {
            console.error(error);
        }

    })

    socket.on('chatMessage', messageData => {
        io.emit('chatMessage', messageData);
    })

    socket.on('disconnect', async () => {
        try {
            await createUserTable();
            await removeUserQuery(socket.id);

            console.log(`${socket.id} disconnected`);
            io.emit('userLeft', currUsername);
        } catch (error) {
            console.error(error);
        }
    })
})

server.listen(+SERVER_PORT, HOST, () => {
    console.log(`Server listening on http://${HOST}:${SERVER_PORT}`);
});

