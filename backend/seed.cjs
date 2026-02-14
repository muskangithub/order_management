const { drizzle } = require('drizzle-orm/node-postgres');
const { Pool } = require('pg');
const { pgTable, uuid, text, numeric, pgEnum } = require('drizzle-orm/pg-core');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

// Inline schema
const statusEnum = pgEnum('status', ['RECEIVED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED']);

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
});

const seed = async () => {
    console.log('Seeding database...');

    try {
        // Create a default user if not exists
        const [user] = await db.insert(users).values({
            name: 'Test User',
            phone: '1234567890',
            address: '123 Test St, Food City',
        }).onConflictDoNothing().returning();

        if (user) console.log(`Created user: ${user.id}`);

        // Create menu items
        const menu = [
            {
                name: 'Margherita Pizza',
                description: 'Classic tomato and mozzarella pizza',
                price: '12.99',
                imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=400',
            },
            {
                name: 'Cheeseburger',
                description: 'Juicy beef patty with cheddar cheese',
                price: '9.99',
                imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400',
            },
            {
                name: 'Caesar Salad',
                description: 'Fresh romaine lettuce with Caesar dressing',
                price: '8.50',
                imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=400',
            },
            {
                name: 'Chicken Alfredo',
                description: 'Creamy pasta with grilled chicken',
                price: '14.50',
                imageUrl: 'https://images.unsplash.com/photo-1645112481335-502a16d51025?q=80&w=400',
            },
        ];

        await db.insert(menuItems).values(menu);
        console.log('Seed completed successfully!');
    } catch (err) {
        console.error('Seed error:', err);
    } finally {
        await pool.end();
        process.exit(0);
    }
};

seed();
