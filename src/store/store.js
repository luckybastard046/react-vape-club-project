import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";
import authReducer from "./features/auth/authSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});