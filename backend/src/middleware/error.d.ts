import type { Context } from "hono";
export declare const errorHandler: (err: any, c: Context) => Response & import("hono").TypedResponse<{
    success: false;
    message: any;
    stack: any;
}, any, "json">;
//# sourceMappingURL=error.d.ts.map