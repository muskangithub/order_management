import { z } from 'zod';
export declare const createOrderSchema: z.ZodObject<{
    userId: z.ZodOptional<z.ZodString>;
    userData: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        phone: z.ZodString;
        address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        phone: string;
        address: string;
    }, {
        name: string;
        phone: string;
        address: string;
    }>>;
    items: z.ZodArray<z.ZodObject<{
        menuItemId: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        menuItemId: string;
        quantity: number;
    }, {
        menuItemId: string;
        quantity: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    items: {
        menuItemId: string;
        quantity: number;
    }[];
    userId?: string | undefined;
    userData?: {
        name: string;
        phone: string;
        address: string;
    } | undefined;
}, {
    items: {
        menuItemId: string;
        quantity: number;
    }[];
    userId?: string | undefined;
    userData?: {
        name: string;
        phone: string;
        address: string;
    } | undefined;
}>;
export declare const updateStatusSchema: z.ZodObject<{
    status: z.ZodEnum<["RECEIVED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"]>;
}, "strip", z.ZodTypeAny, {
    status: "RECEIVED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED";
}, {
    status: "RECEIVED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED";
}>;
//# sourceMappingURL=order.validator.d.ts.map