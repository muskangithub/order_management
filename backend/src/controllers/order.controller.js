import { orderService } from "../services/order.service.js";
import { userService } from "../services/user.service.js";
export const orderController = {
    createOrder: async (c) => {
        const body = await c.req.json();
        let userId = body?.userId;
        if (!userId && body?.userData) {
            const user = await userService.findOrCreate(body.userData);
            if (!user)
                throw new Error("Failed to create user");
            userId = user.id;
        }
        const order = await orderService.create(userId, body.items);
        return c.json({ success: true, data: order }, 201);
    },
    getOrder: async (c) => {
        const id = c.req.param('id');
        const order = await orderService.getById(id);
        if (!order)
            return c.json({ success: false, message: 'Order not found' }, 404);
        return c.json({ success: true, data: order });
    },
    updateStatus: async (c) => {
        const id = c.req.param('id');
        const { status } = await c.req.json();
        const order = await orderService.updateStatus(id, status);
        return c.json({ success: true, data: order });
    },
    getOrdersByPhone: async (c) => {
        const phone = c.req.param('phone');
        const orders = await orderService.getByPhone(phone);
        return c.json({ success: true, data: orders });
    },
};
//# sourceMappingURL=order.controller.js.map