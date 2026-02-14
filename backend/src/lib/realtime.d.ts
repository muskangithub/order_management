import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
export declare const initRealtime: (server: HttpServer) => Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
export declare const emitStatusUpdate: (orderId: string, status: string) => void;
//# sourceMappingURL=realtime.d.ts.map