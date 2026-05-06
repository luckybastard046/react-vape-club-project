import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalItems: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart(state, action) {
      const item = action.payload;
      // console.log(item)
      const existItems = state.cartItems.find((c) => c.$id == item.$id);
      if (existItems) {
        existItems.quantity += 1;
        state.totalItems = state.cartItems.length;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
        state.totalItems = state.cartItems.length;
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0,
      );
    },
    removeFromCart(state, action) {
      console.log("remove");
      const item = action.payload;
      const existItems = state.cartItems.find((c) => c.$id == item.$id);
      if (existItems) {
        if (existItems.quantity > 1) {
          existItems.quantity -= 1;
          state.totalItems = state.cartItems.length;
        } else {
          // remove item completely if quantity is 1
          state.cartItems = state.cartItems.filter((c) => c.$id !== item.$id);
        }
      }
      state.totalItems = state.cartItems.length;
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0,
      );
    },

    clearCart(state) {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
    removeItem(state, action) {
      const id = action.payload;
      console.log("id" , id)

      const item = state.cartItems.find((c) => c.$id === id);

      if (item) {
        state.cartItems = state.cartItems.filter((c) => c.$id !== id);
        state.totalItems = state.cartItems.length;
        state.totalAmount -= item.price * item.quantity;
      }
    },
  },
});

export const { addTocart, removeFromCart, clearCart, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;