import { createAdaptorServer } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { initRealtime } from './lib/realtime.js';

const app = new Hono();

app.use(
    '*',
    cors({
        origin: [
            'http://localhost:3000',
            'https://order-management-ten-taupe.vercel.app',
            'https://order-management-3mzf.vercel.app',
        ],
        credentials: true,
    })
);

app.get('/', (c) => c.text('Order Management API'));

const port = Number(process.env.PORT) || 3001;

const httpServer = createAdaptorServer(app);

initRealtime(httpServer as any);

httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
