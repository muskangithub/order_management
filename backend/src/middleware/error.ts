import type { Context } from "hono";

export const errorHandler = (err: any, c: Context) => {
    console.error(err);

    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    return c.json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    }, status);
};
