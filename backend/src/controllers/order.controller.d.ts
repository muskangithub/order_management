import type { Context } from "hono";
export declare const orderController: {
    createOrder: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        success: true;
        data: {
            items: any[];
            id?: string | undefined;
            userId?: string | undefined;
            status?: "RECEIVED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED" | undefined;
            createdAt?: string | undefined;
            totalAmount?: string | undefined;
        };
    }, 201, "json">>;
    getOrder: (c: Context) => Promise<(Response & import("hono").TypedResponse<{
        success: false;
        message: string;
    }, 404, "json">) | (Response & import("hono").TypedResponse<{
        success: true;
        data: {
            id: string;
            userId: string;
            status: "RECEIVED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED";
            createdAt: string;
            totalAmount: string;
            orderItems: {
                id: string;
                price: string;
                orderId: string;
                menuItemId: string;
                quantity: string;
                menuItem: {
                    id: string;
                    name: string;
                    description: string;
                    price: string;
                    imageUrl: string;
                    category: string;
                    createdAt: string;
                };
            }[];
        };
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">)>;
    updateStatus: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        success: true;
        data: {
            id: string;
            userId: string;
            status: "RECEIVED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED";
            totalAmount: string;
            createdAt: string;
        } | undefined;
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
    getOrdersByPhone: (c: Context) => Promise<Response & import("hono").TypedResponse<{
        success: true;
        data: {
            id: string;
            totalAmount: string;
            status: "RECEIVED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED";
            createdAt: string;
        }[];
    }, import("hono/utils/http-status").ContentfulStatusCode, "json">>;
};
//# sourceMappingURL=order.controller.d.ts.map