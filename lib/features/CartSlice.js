import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  result: 0,
  cartProducts: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    add: (currentState, action) => {
      currentState.result += 1;
      currentState.cartProducts.push(action.payload)
    },
  },
});

export const { add } = cartSlice.actions;
export default cartSlice.reducer;
