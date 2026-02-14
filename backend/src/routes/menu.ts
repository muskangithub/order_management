import { Hono } from 'hono';
import { menuController } from '../controllers/menu.controller';

const menuRouter = new Hono();

menuRouter.get('/', menuController.getMenu);

export { menuRouter };
