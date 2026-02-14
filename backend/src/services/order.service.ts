import { db } from '../db/index.js';
import { orders, orderItems, menuItems, users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { emitStatusUpdate } from '../lib/realtime.js';

export const orderService = {
    create: async (userId: string, items: { menuItemId: string; quantity: number }[]) => {
        return await db.transaction(async (tx) => {
            // 1. Calculate total amount and fetch items
            let totalAmount = 0;
            const orderItemsToInsert: any[] = [];

            for (const item of items) {
                const menuItem = await tx.select().from(menuItems).where(eq(menuItems.id, item.menuItemId)).limit(1);
                if (menuItem.length === 0) throw new Error(`Menu item ${item.menuItemId} not found`);

                const price = parseFloat(menuItem[0]?.price || '0');
                totalAmount += price * item.quantity;

                orderItemsToInsert.push({
                    menuItemId: item.menuItemId,
                    quantity: item.quantity.toString(),
                    price: price.toString(),
                });
            }

            // 2. Create order
            const [newOrder] = await tx.insert(orders).values({
                userId,
                totalAmount: totalAmount.toString(),
                status: 'RECEIVED',
            }).returning();

            // 3. Create order items
            await tx.insert(orderItems).values(
                orderItemsToInsert.map(oi => ({ ...oi, orderId: newOrder?.id }))
            );

            // 4. Start status simulation (async)
            if (newOrder) {
                orderService.simulateStatusTransitions(newOrder.id);
            }

            return { ...newOrder, items: orderItemsToInsert };
        });
    },

    simulateStatusTransitions: async (orderId: string) => {
        const delays = [10000, 20000, 20000]; // 10s, 20s, 20s
        const statuses: ('PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED')[] = ['PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];

        for (let i = 0; i < statuses.length; i++) {
            const status = statuses[i];
            setTimeout(async () => {
                try {
                    await orderService.updateStatus(orderId, status);
                    console.log(`Order ${orderId} moved to ${status}`);
                } catch (error) {
                    console.error(`Failed to update status for order ${orderId}:`, error);
                }
            }, delays.slice(0, i + 1).reduce((a, b) => a + b, 0));
        }
    },

    getById: async (id: string) => {
        const order = await db.query.orders.findFirst({
            where: eq(orders.id, id),
            with: {
                orderItems: {
                    with: {
                        menuItem: true,
                    },
                },
            },
        });
        return order;
    },

    getByPhone: async (phone: string) => {
        const results = await db.select({
            id: orders.id,
            totalAmount: orders.totalAmount,
            status: orders.status,
            createdAt: orders.createdAt,
        })
            .from(orders)
            .innerJoin(users, eq(orders.userId, users.id))
            .where(eq(users.phone, phone))
            .orderBy(orders.createdAt);

        return results;
    },

    updateStatus: async (id: string, status: 'RECEIVED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED') => {
        const [updatedOrder] = await db.update(orders)
            .set({ status })
            .where(eq(orders.id, id))
            .returning();

        emitStatusUpdate(id, status);

        return updatedOrder;
    },
};
