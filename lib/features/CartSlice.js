import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ element, token }) => {
    let res = await fetch(
      "https://e-commerce-backend-nine-olive.vercel.app/api/cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({
          products: [
            {
              id: element.id,
              title: element.title,
              price: element.price,
              category: element.category,
              discount: element.discountPercentage,
              image: element.images[0],
              quantity: 1,
            },
          ],
        }),
      },
    );
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message);
    }
    return result;
  },
);

const initialState = {
  firstName: "Account",
  cartProducts: [],
  total: 0,
  defaultProductsCounter: 0,
  isLoading: false,
  success: false,
  loadingProductId:null
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
      // currentState.loadingProductId = null;
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
      // currentState.loadingProductId = element.id;
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
  extraReducers(builder) {
    builder
      .addCase(addToCart.pending, (state,action) => {
        state.success = false;
        state.isLoading = true;
        state.loadingProductId = action.meta.arg.element.id;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.success = true;
        state.isLoading = false;
      })
      .addCase(addToCart.rejected, (state) => {
        state.success = false;
        state.isLoading = false;
      });
  },
});

export const { restore, add, increase, decrease } = cartSlice.actions;
export default cartSlice.reducer;
