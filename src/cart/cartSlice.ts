import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "./cartTypes";

const storedCart = sessionStorage.getItem("cart");
const initialState: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = state.find(p => p.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
      sessionStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const index = state.findIndex(p => p.id === action.payload);
      if (index !== -1) state.splice(index, 1);
      sessionStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart(state) {
      state.length = 0;
      sessionStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;