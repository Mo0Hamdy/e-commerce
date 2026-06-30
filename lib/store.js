import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/CartSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
};
