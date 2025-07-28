# 🛒 Advanced E-Commerce Application with Firebase

## Overview

A modern, full-featured e-commerce web application built with **React**, **TypeScript**, **Redux Toolkit**, **React Query**, and **Firebase**. It offers:

- Firebase Authentication with email/password registration and login
- Firestore backend replacing FakeStoreAPI for products, users, and orders
- Real-time syncing and persistent cart state with Redux Toolkit and sessionStorage
- Responsive UI styled with a custom earthy color palette
- Order management with detailed views and user-specific histories

---

## ✨ Features

### 🔐 Authentication & User Management
- User registration with email/password
- Secure login/logout with Firebase Authentication
- User profiles stored and managed in Firestore
- Update and delete user profiles including full account deletion with reauthentication

### 🛍️ Product Management
- Products stored in Firestore collection
- CRUD operations for products (create, read, update, delete) via Firestore
- Display of product images, titles, prices, and categories
- Dynamic category filtering

### 🛒 Shopping Cart
- Managed with Redux Toolkit, persisted in sessionStorage
- Add, remove, clear cart items
- Dynamic quantity and total price calculations
- Checkout creates a Firestore order document linked to the user

### 🧾 Order Management
- Orders saved in Firestore with product details, timestamps, and user references
- View order history and individual order details with product images and info
- Secure querying with Firestore rules and indexes

### 🎨 UI & Styling
- Responsive layout for product grids, cart, and modals
- Consistent, reusable components styled with earthy green palette:
  - `#DAD7CD`, `#A3B18A`, `#588157`, `#3A5A40`, `#344E41`
- Modal checkout confirmation for better UX

---

## 🛠 Tech Stack

- React + TypeScript
- Redux Toolkit (cart state management)
- React Query (data fetching/caching)
- Firebase Authentication (user auth)
- Firestore (products, users, orders data storage)
- CSS (custom styling, no framework)
- React Router (navigation)

---

## 🚀 Getting Started

### Prerequisites
- Node.js and npm/yarn installed
- Firebase project set up with Authentication and Firestore enabled

### Installation

1. **Clone the repo:**

```bash
git clone https://github.com/TyB3ar/E-Commerce-App-.git
cd E-Commerce-App-
```

2. **Install Dependencies**

```bash
npm install 
# or
yarn install
```

3. **Configure Firebase** 

- Copy your Firebase Config from the Firebase Console
- Paste it into 'src/firebase/fbConfig.ts'

4. **Run the App**
```bash
npm run dev 
# or 
yarn run dev
```


## 🧪 Testing and Usage
- Register a new user with optional name and address fields.

- Login and update your profile, or delete your account (requires re-entering password).

- Browse products fetched live from Firestore.

- Add/remove products to/from the cart.

- Checkout to place an order, which stores data in Firestore.

- View your order history and order details, including product images.

- Admin users can add, edit, or delete products (if implemented).


## 🔒 Security and Firestore Rules
- Firestore security rules allow reads and writes only for authenticated users.

- Orders and profiles are accessible only by their owners.

- Composite indexes created for efficient querying of orders by user.