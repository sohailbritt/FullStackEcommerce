# 🛍️ Modern E-commerce Application

A full-featured e-commerce platform built with Next.js 14, TypeScript, Prisma, and PostgreSQL. Features a modern UI with Tailwind CSS and state management using Zustand.

Dummy Account for check username:tony@gmail.com password:qwerty

## ✨ Features

- 🔐 Secure Authentication (Sign Up/Sign In)
- 🏪 Product Catalog with Categories
- 🛒 Shopping Cart Management
- 💝 Wishlist Functionality
- 💳 Seamless Checkout Process
- 🌓 Save for Later Feature
- ⚡ Real-time Cart Updates
- 💨 Skeleton Loading for Better UX
- 📱 Fully Responsive Design

## 🚀 Tech Stack

- **Frontend:**

  - Next.js 14 (React Framework)
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components
  - Zustand (State Management)

- **Backend:**
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL Database
  - JWT Authentication
  - Bcrypt for Password Hashing

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ecommerce-app.git
   cd ecommerce-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with the following:

   ```env
   DATABASE_URL="your_postgresql_url"
   JWT_SECRET="your_jwt_secret"
   RAZORPAY_KEY="your secret"
   RAZORPAY_SECRET="your secret"
   ```

4. Set up the database:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## 🌟 Key Features Explained

### Authentication

- Secure user registration and login
- JWT-based session management
- Protected routes and API endpoints

### Product Management

- Browse products by categories
- Dynamic product filtering
- Detailed product views
- Skeleton loading for smooth UX

### Shopping Cart

- Add/remove items
- Adjust quantities
- Real-time price updates
- Persistent cart state

### Wishlist

- Save favorite items
- Easy transfer to cart
- Synchronized with backend

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:

- Desktop computers
- Tablets
- Mobile devices

## 🔧 Development

- Run development server:

  ```bash
  npm run dev
  ```

- Build for production:

  ```bash
  npm run build
  ```

- Start production server:
  ```bash
  npm start
  ```

## 🙏 Acknowledgments

- Next.js Team for the amazing framework
- Vercel for hosting solutions
- Shadcn UI for beautiful components
