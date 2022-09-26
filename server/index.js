import express from 'express';
import morgan from 'morgan';
import { Server as socketServer } from 'socket.io';
import http from 'http';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new socketServer(server, {
    cors: {
        origin: '*'
    }
})

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(morgan('dev'));

io.on('connection', (socket) => {
    let canal='';
    socket.on('subscribe', room => {
        console.log('Se unió a la sala '+room);
        socket.join(room);
        canal = room;
    });

    socket.on('send message', data => {
        console.log(data.room);
        socket.broadcast.to(canal).emit('back', {
            usuario: socket.id,
            contenido: data
        });
    });
    // socket.on('mensajeDesdeFront', value => { 

    //     socket.broadcast.emit('mensajedelBak', {
    //         usuario: socket.id,
    //         contenido: value
    //     });
    // });
})



server.listen(PORT);
console.log('Server en puerto ' + PORT);