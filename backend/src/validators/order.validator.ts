import { z } from 'zod';

export const createOrderSchema = z.object({
    userId: z.string().uuid().optional(),
    userData: z.object({
        name: z.string().min(2),
        phone: z.string().min(10),
        address: z.string().min(10),
    }).optional(),
    items: z.array(z.object({
        menuItemId: z.string().uuid(),
        quantity: z.number().int().positive(),
    })),
}).refine(data => data.userId || data.userData, {
    message: "Either userId or userData must be provided",
    path: ["userId"],
});

export const updateStatusSchema = z.object({
    status: z.enum(['RECEIVED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED']),
});
