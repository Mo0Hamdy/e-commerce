import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
  firstName: "Account",
  cartProducts: [],
  total:0,
  defaultProductsCounter: 0,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    restore: (currentState, action) => {
      currentState.cartProducts = action.payload.products || [];
      currentState.defaultProductsCounter = action.payload.counter || 0;
      currentState.firstName = action.payload.firstName || "Account";
      currentState.total = action.payload.total || 0;
    },
    add: (currentState, action) => {
      let { element } = action.payload;
      let exists = currentState.cartProducts.find((item) => {
        if (item.id === element.id) {
          item.quantity++;
          return true;
        } else {
          return false;
        }
      });
      if (!exists) {
        let newProduct = {
          id: element.id,
          quantity: 1,
          title: element.title,
          price: element.price,
          category: element.category,
          discount: element.discount,
          image: element.images[0],
        };
        currentState.cartProducts.push(newProduct);
        
      }
      currentState.defaultProductsCounter += 1;
      currentState.total += element.price;
    },
    increase: (currentState, action) => {
      currentState.defaultProductsCounter += 1;
      const { id } = action.payload;
      currentState.cartProducts.find((item) => {
        if (item.id === id) {
          item.quantity++;
          currentState.total += item.price;
        }
      });
    },
    decrease: (currentState, action) => {
      let { id } = action.payload;
      let index = currentState.cartProducts.findIndex((item) => item.id === id);
      if (index === -1) return;
      currentState.cartProducts[index].quantity--;
      currentState.total -= currentState.cartProducts[index].price;
      if (currentState.cartProducts[index].quantity === 0) {
        currentState.cartProducts.splice(index, 1);
      }
      currentState.defaultProductsCounter -= 1;
      
    },
  },
});

export const { restore, add, increase, decrease } = cartSlice.actions;
export default cartSlice.reducer;
