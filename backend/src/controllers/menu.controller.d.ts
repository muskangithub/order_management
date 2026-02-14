import type { Context } from 'hono';
export declare const menuController: {
    getMenu: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        success: true;
        data: {
            id: string;
            name: string;
            description: string;
            price: string;
            imageUrl: string;
            category: string;
            createdAt: string;
        }[];
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
};
//# sourceMappingURL=menu.controller.d.ts.map