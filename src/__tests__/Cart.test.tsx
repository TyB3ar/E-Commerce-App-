// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Cart from '../components/Cart'; 
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "../cart/cartSlice"; 

module.exports = {}; 

// Mock useAuth hook for user verification
jest.mock("../hooks/useAuth", () => ({
    useAuth: () => ({
        user: { uid: "user123" },
    }),
}));

// Mock createOrder
jest.mock("../firebase/orders", () => ({
    createOrder: jest.fn(() => Promise.resolve("order-id")),
}));

const renderWithStore = (preloadedCartState: any) => {
    const store = configureStore({
        reducer: { cart: cartReducer },
        preloadedState: { cart: preloadedCartState },
    });

    return {
        ...render(
            <Provider store={store}>
                <BrowserRouter>
                    <Cart />
                </BrowserRouter>
            </Provider>
        ),
        store,
    };
};

describe("Cart Integration Test", () => {
    const product = {
        id: 1, 
        title: "Test Product",
        image: "https://example.com/image.jpg",
        quantity: 2, 
        price: 9.99,
    };

    test("renders cart items and handles checkout flow", async () => {
        const { store } = renderWithStore([product]); 
        
        // Cart Contents are shown
        expect(screen.getByText('Test Product')).toBeInTheDocument(); 
        expect(screen.getByText('Qty: 2')).toBeInTheDocument(); 
        expect(screen.getByText('Price: $9.99')).toBeInTheDocument(); 
        expect(screen.getByText('Total Items: 2')).toBeInTheDocument(); 
        expect(screen.getByText('Total Price: $19.98')).toBeInTheDocument(); 

        // Click checkout
        fireEvent.click(screen.getByText("Checkout"));

        // Wait for modal to appear 
        await waitFor(() => 
            expect(
                screen.getByText("🎉 Order Placed Successfully!")
            ).toBeInTheDocument()
        );

        // Redux cart state should be cleared 
        expect(store.getState().cart).toEqual([]);

        // Modal Buttons are shown
        expect(screen.getByText("Close")).toBeInTheDocument();
        expect(screen.getByText("Order Details")).toBeInTheDocument(); 
    });

    test("displays empty cart message", () => {
        renderWithStore([]);

        expect(screen.getByText("Your cart is empty.")).toBeInTheDocument(); 
    });
});
