# 🛒 Advanced E-Commerce Application with Firebase


## Overview

A modern, full-featured e-commerce web application built with **React**, **TypeScript**, **Redux Toolkit**, **React Query**, and **Firebase**. Built with **Test-Driven Development** and deployed using **CI/CD pipelines via GitHub Actions**.

### 🔧 Core Features

- 🔐 Firebase Authentication with email/password registration and secure login
- 🔥 Firestore backend replacing FakeStoreAPI for products, users, and orders
- 🛒 Persistent shopping cart with Redux Toolkit + sessionStorage
- 🧾 Order management with detailed user-specific histories
- 🎨 Fully responsive UI styled with a custom earthy color palette
- 🧪 Unit and integration testing with Jest and React Testing Library
- 🚀 GitHub Actions for continuous integration and testing on each push/PR

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

## 🧪 Testing & TDD

This app was developed using **Test-Driven Development** principles with the following stack:

- **Jest** – Unit test runner
- **React Testing Library** – Component and integration tests
- **Mock Service Workers (MSW)** – API mocking (optional for integration)
- **CI Integration** – All tests run automatically on GitHub push or pull request

To run tests locally:

```bash
npm test
# or
yarn test
``` 

---

## 🛠 Tech Stack

- ⚛️ React + TypeScript

- 🛠️ Redux Toolkit for global state

- 🔄 React Query for data fetching

- 🔥 Firebase Authentication + Firestore

- 📦 CSS (custom-styled, no framework)

- 🧭 React Router for navigation

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

This project uses a placeholder firebaseConfig. Create your own Firebase project and add your credentials in:
```bash
src/firebase/fbConfig.ts
```

Example: 
```bash
const firebaseConfig = {
  apiKey: "your_api_key",
  authDomain: "your_auth_domain",
  projectId: "your_project_id",
  storageBucket: "your_storage_bucket",
  messagingSenderId: "your_messaging_sender_id",
  appId: "your_app_id",
};
```

⚠️ Do not commit your API keys. Use environment variables for deployment if needed.


4. **Run the App**
```bash
npm run dev 
# or 
yarn run dev
```


## 🧪 App Usage

- Register a new user with optional name and address fields.

- Login and update your profile, or delete your account (requires re-entering password).

- Browse products fetched live from Firestore.

- Add/remove products to/from the cart.

- Checkout to place an order, which stores data in Firestore.

- View your order history and order details, including product images.

- Admin users can add, edit, or delete products (if implemented).


## CI/CD Pipeline

This app uses GitHub Actions to automate: 

- 🧪 Running all Jest tests on push/PR

- ✅ Ensuring no broken changes get merged

.github/workflows/main.yml runs on:
```bash
yaml 

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
```

- CI runs in a jest-latest environment and uses react-scripts test or vitest, depending on setup.

## 🔒 Security and Firestore Rules
- Firestore security rules allow reads and writes only for authenticated users.

- Orders and profiles are accessible only by their owners.

- Composite indexes created for efficient querying of orders by user.

## 📝 Contributing

Feel free to fork, open issues, or submit pull requests. Just remember:

- Keep credentials out of commits

- Write tests for new features

- Follow existing code style and structure

## Link to Live App : 

 - https://e-commerce-app-6n1d.vercel.app/ 