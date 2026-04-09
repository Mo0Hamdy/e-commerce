import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/CartSlice";
import userReducer from "./features/UserSlice"
export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      user:userReducer,
    },
  });
};

