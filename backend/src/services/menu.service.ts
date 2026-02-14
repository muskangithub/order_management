import { db } from '../db/index.js';
import { menuItems } from '../db/schema.js';

export const menuService = {
    getAll: async () => {
        return await db.select().from(menuItems);
    },
};
