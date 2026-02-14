import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { menuRouter } from './routes/menu.js';
import { orderRouter } from './routes/orders.js';
import { errorHandler } from './middleware/error.js';
import { createServer } from 'http';
import { initRealtime } from './lib/realtime.js';

const app = new Hono();

app.use('*', cors());

app.get('/', (c) => c.text('Order Management API'));

app.route('/api/menu', menuRouter);
app.route('/api/orders', orderRouter);

app.onError(errorHandler);

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

const httpServer = createServer();

// Attach Hono to server
serve({
    fetch: app.fetch,
    server: httpServer,
    port, // 👈 let Hono handle listen
});

// Attach realtime
initRealtime(httpServer);

console.log(`Server is running on port ${port}`);
