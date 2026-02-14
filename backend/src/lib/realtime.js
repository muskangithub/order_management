import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
let io;
export const initRealtime = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
        },
    });
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);
        socket.on('join-order', (orderId) => {
            socket.join(`order-${orderId}`);
            console.log(`Socket ${socket.id} joined order-${orderId}`);
        });
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
    return io;
};
export const emitStatusUpdate = (orderId, status) => {
    if (io) {
        io.to(`order-${orderId}`).emit('status-update', { orderId, status });
    }
};
//# sourceMappingURL=realtime.js.map