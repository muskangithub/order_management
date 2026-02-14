# 🍔 Foodie - Order Management System

A production-grade, full-stack food ordering application featuring real-time order tracking, a categorized menu with search, and a premium UI.

## ✨ Key Features

- **Real-time Order Tracking**: Live updates on order status (Received → Preparing → Out for Delivery → Delivered) using Socket.io.
- **Categorized Menu**: Browse food items by categories (Burgers, Pizzas, Pastas, etc.).
- **Smart Search**: Instant search functionality to find your favorite meals.
- **Persistent Cart**: Seamlessly add items to your cart and manage quantities.
- **Professional UI**: A sleek, indigo-themed interface built with Next.js and ShadCN UI.
- **Robust Backend**: Built with Hono and Drizzle ORM for high performance and scalability.

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Real-time**: [Socket.io Client](https://socket.io/)

### Backend
- **Framework**: [Hono](https://hono.dev/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Real-time**: [Socket.io](https://socket.io/)
- **Runtime**: [Node.js](https://nodejs.org/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL database

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/muskangithub/order_management.git
   cd order_management
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   # Create .env and add DATABASE_URL
   npm run seed # To populate menu items
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## 📝 Environment Variables

### Backend (`/backend/.env`)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/db_name
PORT=3001
```

### Frontend (`/frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🤝 Contributing
Feel free to open issues or submit pull requests to improve the project!

---
Built as a premium full-stack assignment.
