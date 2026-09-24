import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  isSearchLoading: false,
  searchProducts: [],
};

export const fetchSearchProduct = createAsyncThunk(
  "Product/Search",
  async ({ productName }) => {
    
    if (productName != "") {
      const data = await fetch("https://dummyjson.com/products");
      
      if (!data.ok) {
        throw new Error("couldn't find any element");
      }
      
      const response = await data.json();
      return response.products.filter((element) =>
        element.title.toLowerCase().includes(productName.toLowerCase()),
      );
    }
  },
);

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchSearchProduct.pending, (state) => {
        state.isSearchLoading = true;
      })
      .addCase(fetchSearchProduct.fulfilled, (state, action) => {
        state.isSearchLoading = false;
        state.searchProducts = action.payload;
      })
      .addCase(fetchSearchProduct.rejected, (state) => {
        state.isSearchLoading = false;
      });
  },
});

export default searchSlice.reducer;
