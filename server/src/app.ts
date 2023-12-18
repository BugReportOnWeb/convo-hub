import express from 'express';
import * as dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();
const PORT = process.env.PORT;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
});

app.get('/', (_req, res) => {
    const response = { message: "Hello World!" };
    res.send(response);
})

io.on('connection', socket => {
    socket.on('userJoined', username => {
        console.log(`${socket.id} joined`);
        io.emit('userJoined', username);
    })

    socket.on('chatMessage', messageData => {
        io.emit('chatMessage', messageData);
    })

    socket.on('userLeft', username => {
        console.log(`${socket.id} disconnected here on userLeft`);
        io.emit('userLeft', username);
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    })
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

