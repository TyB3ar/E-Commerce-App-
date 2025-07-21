# Advanced E-Commerce Application

## Overview

This is a modern, responsive e-commerce web application built with React, TypeScript, Redux Toolkit, and React Query. It connects to the [FakeStoreAPI](https://fakestoreapi.com/) to fetch product data dynamically and provides a smooth shopping experience including product browsing, category filtering, and a fully featured shopping cart with persistence.

---

## Features

### Product Catalog

- **Product Listing and Display**  
  Fetches all products from FakeStoreAPI using React Query and displays them on the Home page. Each product shows title, price, category, description, rating, and image.

- **Category Navigation**  
  Dynamically fetches product categories from the API to populate a category dropdown. Selecting a category filters the displayed products accordingly.

### Shopping Cart

- **State Management with Redux Toolkit**  
  Manages the cart state (add, update, remove products) via Redux Toolkit. Actions update both Redux state and persist data to `sessionStorage` for browser session persistence.

- **Shopping Cart Component**  
  Displays all products added to the cart, including title, image, quantity, and price. Users can remove items directly from the cart.

- **Total Quantity and Price Calculation**  
  Dynamically calculates and displays the total number of items and the total cost in the cart.

- **Checkout Functionality**  
  Simulates checkout by clearing the cart state and `sessionStorage`. Provides user feedback upon successful checkout.

### Additional Features

- **Responsive UI**  
  Product grid and cart layout adapt to various screen sizes for usability on desktop and mobile.

- **Consistent Styling**  
  Utilizes a custom earthy color palette and consistent button styles across the app for a polished look.

- **Modal Checkout (Optional)**  
  Checkout process can be displayed as a modal on the cart page for better user experience.

---

## Tech Stack

- React with TypeScript  
- Redux Toolkit for state management  
- React Query for data fetching and caching  
- Axios for API requests  
- CSS modules / plain CSS for styling (custom color palette)  
- FakeStoreAPI as product data source

---

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo

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

