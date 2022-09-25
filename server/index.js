import express from 'express';
import morgan from 'morgan';
import {Server as socketServer } from 'socket.io';
import http from 'http';
import cors from 'cors';

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new socketServer(server, {
    cors: {
        origin:'https://juanisa.github.io/chat-en-vivo/'
    }
})

const PORT = process.env.PORT || 3000; 

app.use(morgan('dev'));

io.on('connection', (socket) => {
    socket.on('mensajeDesdeFront', value => { 
        socket.broadcast.emit('mensajedelBak', {
            usuario: socket.id,
            contenido: value
        });
    });
})



server.listen(PORT);
console.log('Server en puerto '+PORT);