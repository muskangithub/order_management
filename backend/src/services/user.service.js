import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq, and } from 'drizzle-orm';
export const userService = {
    findOrCreate: async (data) => {
        // Find existing user by phone (simple lookup for this demo)
        const existingUser = await db.select().from(users).where(eq(users.phone, data.phone)).limit(1);
        if (existingUser.length > 0) {
            return existingUser[0];
        }
        // Create new user if not found
        const [newUser] = await db.insert(users).values({
            name: data.name,
            phone: data.phone,
            address: data.address,
        }).returning();
        return newUser;
    },
};
//# sourceMappingURL=user.service.js.map