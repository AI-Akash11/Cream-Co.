# 🧁 Cream & Co. - Artisan Cake Studio

> **Dhaka's Finest Artisan Cake Studio.** Handcrafted with premium ingredients. Every bite tells a story of tradition, passion, and celebration.

[![Build Status](https://img.shields.io/badge/Build-Success-success?style=for-the-badge)](https://cream-and-co.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Tech-Next.js%2015%20%7C%20Tailwind%20%7C%20MongoDB-blue?style=for-the-badge)](https://nextjs.org)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge)](https://vercel.com)

---

## 📌 Project Overview

**Cream & Co.** is a production-ready, single-vendor e-commerce platform built for a Dhaka-based home bakery business. The platform supports pre-order cake purchases, a highly interactive custom cake builder, dual-gateway online payments (Stripe & SSLCommerz), and a comprehensive admin dashboard for order management.

This project is a high-performance full-stack application demonstrating modern web development best practices, role-based access control (RBAC), and complex state management.

### 🔗 [Visit the Live Demo](https://cream-and-co.vercel.app)

---

## ✨ Key Features

### 🎂 Professional Cake Shop
- **Artisan Catalog**: Browse a curated collection of premium cakes with filtering and sorting.
- **Dynamic Pricing**: Prices update in real-time based on selected size (lb/kg) and flavor.
- **Detailed Insights**: High-resolution image galleries and preparation time notifications.

### 🎨 Custom Cake Builder
- **Step-by-Step Experience**: A multi-step interactive form to design unique cakes.
- **Total Personalization**: Choose colors, flavors, fillings, and add handcrafted messages.
- **Instant Integration**: Custom designs flow directly into the global cart system.

### 💳 Secure & Diverse Payments
- **Stripe Integration**: Secure international credit/debit card processing.
- **SSLCommerz Integration**: Local Bangladesh gateway for Mobile Banking (bKash, Nagad) and local cards.
- **Order Lifecycle**: Real-time tracking from "Pending" to "Delivered" with status-based UI updates.

### 🛠️ Dedicated Admin Control
- **Orders Dashboard**: Manage all platform orders with detailed status controls.
- **Database Management**: Full CRUD for the cake catalog via an intuitive admin UI.
- **Revenue Analytics**: Visual summaries of business performance (Coming in V2).

---

## 🏗️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS + DaisyUI |
| **Animations** | GSAP 3 (GreenSock) |
| **Database** | MongoDB Atlas (via Mongoose) |
| **Auth** | NextAuth.js (Credentials & Google) |
| **State Management** | React Context API |
| **Payments** | Stripe & SSLCommerz |
| **Validation** | Zod + React Hook Form |
| **Notifications** | SweetAlert2 + React Hot Toast |

---

## 📂 Project Structure

```text
/src
  /app          # Next.js App Router (Routes & Server Actions)
  /components   # UI Components (layouts, shared, shop, home)
  /context      # Global State Management (CartContext)
  /lib          # Core Utilities (Auth options, DB connection)
  /models       # Mongoose Schemas (User, Order, Cake)
  /provider     # Context Providers (NextAuthProvider)
  /actions      # Server Actions for DB mutations
/public         # Static Assets & Global Branding
```

---

## 🚀 Getting Started

### 1. Prerequisite
- Node.js 18.x or higher
- MongoDB Atlas account
- Stripe & SSLCommerz Sandbox accounts

### 2. Installation
```bash
git clone https://github.com/your-username/cream-and-co.git
cd cream-and-co
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_atlas_uri

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Social Login
GOOGLE_CLIENT_ID=your_google_id
GOOGLE_CLIENT_SECRET=your_google_secret

# Payments
STRIPE_SECRET_KEY=your_stripe_secret
STORE_ID=your_sslcommerz_store_id
STORE_PASSWORD=your_sslcommerz_password
SSLCOMMERZ_IS_LIVE=false

# App URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Development
```bash
npm run dev
```

---

## 📈 Business Logic & Rules

- **Pre-Order Only**: Minimum 24-hour notice is enforced for all orders.
- **Delivery Scope**: Optimized for Dhaka city delivery with fixed shipping logic.
- **Customization**: Strictly validated message lengths and character sets for calligraphy.

---

## 🏁 Deployment

The project is optimized for **Vercel**. Connect your GitHub repository to Vercel, import the environment variables, and it will deploy automatically.

---

## 📝 License

This project is built for **Cream & Co.** and is provided for portfolio review purposes. All rights reserved by the original owners.

---

**Built with ❤️ for Sweet Celebrations.**
