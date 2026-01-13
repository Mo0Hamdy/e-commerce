import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  result: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    add: (currentState, action) => {
      const {additionValue} = action.payload
      currentState.result += additionValue;
    },
  },
});

export const { add } = cartSlice.actions;
export default cartSlice.reducer;
