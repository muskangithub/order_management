export const errorHandler = (err, c) => {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    return c.json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    }, status);
};
//# sourceMappingURL=error.js.map