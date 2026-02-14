import { menuService } from '../services/menu.service.js';
export const menuController = {
    getMenu: async (c) => {
        try {
            const menu = await menuService.getAll();
            return c.json({ success: true, data: menu });
        }
        catch (error) {
            throw error;
        }
    },
};
//# sourceMappingURL=menu.controller.js.map