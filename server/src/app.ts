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
    console.log(`${socket.id} connected`);

    socket.on('chatMessage', messageData => {
        console.log('here in server', messageData);
        io.emit('chatMessage', messageData);
    })
    
    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    })
})

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

