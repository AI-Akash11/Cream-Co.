# 🧁 Cream & Co.

Premium Pre-Order Cake Studio (Dhaka Based)

---

# 📌 Project Overview

**Cream & Co.** is a production-ready, single-vendor e-commerce platform built for a Dhaka-based home bakery business. The platform supports pre-order cake purchases, online payments, order lifecycle management, and an admin dashboard.

This project is designed to be portfolio-grade and demonstrates real-world business logic, authentication, payment integration, and role-based access control.

---

# 🎯 Business Model

* Delivery: Dhaka only
* Language: English only
* Pre-order only (Minimum 24-hour notice)
* Fixed delivery charge (e.g., 80 BDT)
* Custom cake message allowed (max 30 characters)
* Online payment required for confirmation (except COD)

---

# 🏗️ Tech Stack

## Frontend

* Next.js (App Router)
* JavaScript (ES6+)
* Tailwind CSS
* Shadcn/UI
* React Hook Form
* Zod (validation)

## Backend

* Next.js API Routes
* MongoDB Atlas
* Mongoose
* NextAuth.js

## Payment Gateways

* Stripe (Test Mode)
* SSLCommerz (Sandbox)

## Deployment

* Vercel
* MongoDB Atlas
* Cloudinary (Image Storage)

---

# 📂 Folder Structure

```
/app
  /(public)
    page.js
    shop/page.js
    product/[slug]/page.js
    cart/page.js
    checkout/page.js

  /(dashboard)
    dashboard/page.js
    dashboard/orders/page.js
    dashboard/profile/page.js

  /(admin)
    admin/page.js
    admin/products/page.js
    admin/orders/page.js
    admin/coupons/page.js

/components
/lib
/models
/actions
/utils
/middleware.js
```

---

# 📄 Page Structure & Features

## 🏠 Home Page

* Hero section
* Featured cakes
* Categories
* Custom cake CTA
* Testimonials
* Dhaka-only delivery banner
* Footer with contact info

---

## 🛍️ Shop Page

* Category filter
* Price sorting
* Search functionality
* Pagination
* Server-side rendered product list

---

## 🎂 Product Details Page

Features:

* Image gallery
* Size selector (1lb / 2lb / 3lb)
* Flavor selector
* Delivery date picker
* Custom message input
* Dynamic price calculation
* Stock validation

Business Logic:

* If delivery date < 24 hours → Add to Cart disabled

---

## 🛒 Cart Page

* Update quantity
* Remove items
* Apply coupon
* Delivery charge calculation
* Live total update

---

## 💳 Checkout Page

Customer Information:

* Full Name
* Phone (Bangladesh validation)
* Address
* Area selection (Dhaka only)

Delivery:

* Confirm delivery date

Payment Options:

* Stripe (Card)
* SSLCommerz (Sandbox)
* Cash on Delivery

Logic:

* Create order (Pending)
* Redirect to payment gateway
* Update order on success

---

## ✅ Order Success Page

* Order ID
* Delivery date
* Payment status
* Order summary

---

# 🔐 Authentication System

* Credentials login
* Optional Google login
* Role-based users:

  * customer
  * admin

Protected Routes:

* /dashboard
* /admin (admin only)

---

# 👤 User Dashboard

## Orders

* View order history
* Track order status

Order Status Flow:

* Pending
* Confirmed
* Baking
* Out for delivery
* Delivered

## Profile

* Update personal info
* Change password

---

# 🛠️ Admin Panel

## Admin Dashboard

* Total revenue
* Total orders
* Pending orders
* Revenue chart (last 7 days)

## Product Management

* Add product
* Edit product
* Delete product
* Toggle availability
* Upload images (Cloudinary)

## Order Management

* View order details
* Update order status
* Verify SSLCommerz payment

## Coupon Management

* Create coupon
* Set expiry date
* Percentage or fixed discount
* Usage limit
* Enable/disable coupon

---

# 🗃️ Database Schema

## User

```
name
email
password
role
phone
address
createdAt
```

## Product

```
name
slug
description
category
images[]
basePrice
sizes[]
flavors[]
stock
preparationTimeHours
isAvailable
createdAt
```

## Order

```
userId
items[]
subtotal
deliveryCharge
discount
total
deliveryDate
paymentMethod
paymentStatus
transactionId
orderStatus
address
phone
createdAt
```

## Coupon

```
code
discountType
value
expiryDate
usageLimit
usedCount
isActive
```

---

# 💳 Payment Integration Plan

## Stripe (Test Mode)

1. Create checkout session
2. Redirect to Stripe
3. Handle webhook
4. Update order payment status

## SSLCommerz (Sandbox)

1. Create payment session
2. Redirect to gateway
3. Handle success/fail callback
4. Validate transaction
5. Update order status

---

# 🇧🇩 Bangladesh-Specific Features

* Dhaka-only delivery banner
* Fixed delivery charge logic
* Phone validation for Bangladesh numbers
* Festival promotional banner toggle
* Mobile-first design

---

# 🚀 Development Roadmap

## Phase 1

* Authentication
* Database setup
* Product CRUD

## Phase 2

* Shop & Product page
* Cart system

## Phase 3

* Checkout system
* Order creation

## Phase 4

* Stripe integration
* SSLCommerz integration

## Phase 5

* Admin dashboard
* Coupon system

## Phase 6

* UI polish
* SEO optimization
* Performance improvements
* Deployment to Vercel

---

# 📈 Portfolio Positioning

This project demonstrates:

* Full-stack development with Next.js
* Role-based authentication
* Payment gateway integration
* Order lifecycle management
* Admin dashboard implementation
* Bangladesh-specific commerce logic
* Production-level folder architecture

---

# 🧠 Future Improvements (Optional)

* Inventory tracking automation
* Daily production capacity control
* Email notifications
* SMS notification integration
* Analytics dashboard enhancement
* Multi-language support

---

# 🏁 Deployment Plan

* Frontend & API: Vercel
* Database: MongoDB Atlas
* Images: Cloudinary
* Environment Variables: Vercel Dashboard

---

# 📌 Final Goal

Build a production-ready, realistic, Bangladesh-focused single-vendor bakery commerce platform that demonstrates advanced full-stack skills and business-aware development.
