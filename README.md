# 🛒 Advanced E-Commerce Application

## Overview

A modern and responsive e-commerce web application built with **React**, **TypeScript**, **Redux Toolkit**, and **React Query**. It integrates with [FakeStoreAPI](https://fakestoreapi.com/) to provide real-time product data, category filtering, and a fully featured shopping cart with session persistence.

---

## ✨ Features

### 🛍️ Product Catalog
- **Dynamic Product Listing** – Fetches and displays all products using React Query.
- **Category Filter** – Pulls product categories from the API; selecting one filters results in real time.

### 🛒 Shopping Cart
- **Redux Toolkit Integration** – Handles add/remove/clear actions with persistent state via `sessionStorage`.
- **Real-Time Totals** – Cart updates item count and total price dynamically.
- **Checkout Simulation** – Clears the cart and session storage with a single click.
- **Modal Checkout UI** *(optional)* – Checkout presented in a modal for improved UX.

### 🎨 UI & UX
- **Responsive Design** – Product grid and cart adapt across screen sizes.
- **Consistent Styling** – Styled with a custom earthy color palette:
  - `#DAD7CD`, `#A3B18A`, `#588157`, `#3A5A40`, `#344E41`
- **Reusable Components** – Product cards and buttons follow consistent design patterns.

---

## 🛠 Tech Stack

- **React + TypeScript** – Component-based architecture with type safety
- **Redux Toolkit** – Global state management for cart
- **React Query** – Efficient API data handling and caching
- **Axios** – Lightweight HTTP client for requests
- **CSS** – Plain CSS with a custom palette (no framework dependency)
- **FakeStoreAPI** – Mock backend for products and categories

---

## 🚀 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/TyB3ar/E-Commerce-App-.git
   cd E-Commerce-App-

2. **Install Dependencies:**
  ```bash
  npm install
  # or
  yarn install
  ```


3. **Run the Development Server**
  ```bash
  npm start
  or 
  yarn start
  ```

