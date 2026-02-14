import { Hono } from 'hono';
import { menuController } from '../controllers/menu.controller.js';
const menuRouter = new Hono();
menuRouter.get('/', menuController.getMenu);
export { menuRouter };
//# sourceMappingURL=menu.js.map