import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: Server;

export const initRealtime = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        socket.on('join-order', (orderId: string) => {
            socket.join(`order-${orderId}`);
            console.log(`Socket ${socket.id} joined order-${orderId}`);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
};

export const emitStatusUpdate = (orderId: string, status: string) => {
    if (io) {
        io.to(`order-${orderId}`).emit('status-update', { orderId, status });
    }
};
