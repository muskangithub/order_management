import { z } from 'zod';
export const createOrderSchema = z.object({
    userId: z.string().optional(),
    userData: z.object({
        name: z.string(),
        phone: z.string(),
        address: z.string(),
    }).optional(),
    items: z.array(z.object({
        menuItemId: z.string(),
        quantity: z.number(),
    })),
});
export const updateStatusSchema = z.object({
    status: z.enum(['RECEIVED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED']),
});
//# sourceMappingURL=order.validator.js.map