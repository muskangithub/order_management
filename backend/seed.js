import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { pgTable, uuid, text, numeric } from 'drizzle-orm/pg-core';
import * as dotenv from 'dotenv';
dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool);
// Inline schema to avoid import issues with ts-node
const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    phone: text('phone').notNull(),
    address: text('address').notNull(),
});
const menuItems = pgTable('menu_items', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    price: numeric('price', { precision: 10, scale: 2 }).notNull(),
    imageUrl: text('image_url').notNull(),
    category: text('category').notNull(),
});
const orders = pgTable('orders', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(),
});
const orderItems = pgTable('order_items', {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id').notNull(),
    menuItemId: uuid('menu_item_id').notNull(),
});
const seed = async () => {
    console.log('Seeding database...');
    try {
        // Create a default user
        const [user] = await db.insert(users).values({
            name: 'Test User',
            phone: '1234567890',
            address: '123 Test St, Food City',
        }).onConflictDoNothing().returning();
        if (user)
            console.log(`Created user: ${user.id}`);
        // Create menu items
        const menu = [
            // Burgers
            {
                name: 'Classic Cheeseburger',
                description: 'Juicy beef patty with aged cheddar, lettuce, tomato, and our secret sauce.',
                price: '10.99',
                imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800',
                category: 'Burgers',
            },
            {
                name: 'Bacon BBQ Burger',
                description: 'Crispy bacon, onion rings, BBQ sauce, and smoked gouda.',
                price: '13.50',
                imageUrl: 'https://images.unsplash.com/photo-1553979459-d2229ba7143b?q=80&w=800',
                category: 'Burgers',
            },
            {
                name: 'Veggie Delite Burger',
                description: 'Plant-based patty with avocado, sprouts, and vegan mayo.',
                price: '11.99',
                imageUrl: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=800',
                category: 'Burgers',
            },
            // Pizzas
            {
                name: 'Margherita Pizza',
                description: 'Classic tomato, fresh mozzarella, basil, and extra virgin olive oil.',
                price: '12.99',
                imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800',
                category: 'Pizzas',
            },
            {
                name: 'Pepperoni Fiesta',
                description: 'Double layer of pepperoni with spicy jalapeños and extra cheese.',
                price: '15.99',
                imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800',
                category: 'Pizzas',
            },
            {
                name: 'Truffle Mushroom Pizza',
                description: 'Assorted wild mushrooms, white truffle oil, and parmesan shavings.',
                price: '18.50',
                imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=800',
                category: 'Pizzas',
            },
            // Pastas
            {
                name: 'Chicken Alfredo',
                description: 'Creamy fettuccine Alfredo topped with grilled chicken and parsley.',
                price: '14.50',
                imageUrl: 'https://images.unsplash.com/photo-1621996346565-e10c1499a4b8?q=80&w=800',
                category: 'Pastas',
            },
            {
                name: 'Pesto Primavera',
                description: 'Penne pasta with basil pesto and seasonal roasted vegetables.',
                price: '13.99',
                imageUrl: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=800',
                category: 'Pastas',
            },
            // Sides
            {
                name: 'Truffle Fries',
                description: 'Crispy golden fries tossed in truffle oil and parmesan.',
                price: '6.99',
                imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800',
                category: 'Sides',
            },
            {
                name: 'Buffalo Wings',
                description: 'Spicy chicken wings served with celery and blue cheese dip.',
                price: '9.50',
                imageUrl: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=800',
                category: 'Sides',
            },
            // Drinks
            {
                name: 'Fresh Berry Smoothie',
                description: 'A blend of strawberries, blueberries, and raspberries.',
                price: '5.99',
                imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?q=80&w=800',
                category: 'Drinks',
            },
            {
                name: 'Craft Lemonade',
                description: 'Hand-squeezed lemons with a hint of mint.',
                price: '3.99',
                imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800',
                category: 'Drinks',
            },
        ];
        // Clear existing data (respecting foreign keys)
        await db.delete(orderItems);
        await db.delete(orders);
        await db.delete(menuItems);
        await db.insert(menuItems).values(menu);
        console.log('Seed completed successfully!');
    }
    catch (err) {
        console.error('Seed error:', err);
    }
    finally {
        await pool.end();
        process.exit(0);
    }
};
seed();
//# sourceMappingURL=seed.js.map