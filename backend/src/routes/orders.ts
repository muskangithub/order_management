import { Hono } from 'hono';
import { orderController } from '../controllers/order.controller.js';
import { zValidator } from '@hono/zod-validator';
import { createOrderSchema, updateStatusSchema } from '../validators/order.validator.js';

const orderRouter = new Hono();

orderRouter.post('/', zValidator('json', createOrderSchema), orderController.createOrder);
orderRouter.get('/:id', orderController.getOrder);
orderRouter.patch('/:id/status', zValidator('json', updateStatusSchema), orderController.updateStatus);
orderRouter.get('/track/:phone', orderController.getOrdersByPhone);

export { orderRouter };
