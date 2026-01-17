import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartProducts: [],
  defaultProductsCounter: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    add: (currentState, action) => {
      let { element } = action.payload;
      let exists = currentState.cartProducts.find((item) => {
        if (item.id === element.id) {
          item.counter++;
          return true;
        } else {
          return false;
        }
      });
      if (!exists) {
        let newProduct = {
          title: element.title,
          id: element.id,
          image: element.images[0],
          price: element.price,
          counter: 1,
        };
        currentState.cartProducts.push(newProduct);
      }
      currentState.defaultProductsCounter += 1;
    },
    increase: (currentState, action) => {
      currentState.defaultProductsCounter += 1;
      let { id } = action.payload;
      currentState.cartProducts.find((item) => {
        if (item.id === id) {
          item.counter++;
        }
      });
    },
    decrease: (currentState, action) => {
      let { id } = action.payload;
      let index = currentState.cartProducts.findIndex((item) => item.id === id);
      if (index === -1) return;
      currentState.cartProducts[index].counter--;
      if (currentState.cartProducts[index].counter === 0) {
        currentState.cartProducts.splice(index, 1);
      }
      currentState.defaultProductsCounter -= 1;
    },
  },
});

export const { add, increase, decrease } = cartSlice.actions;
export default cartSlice.reducer;
