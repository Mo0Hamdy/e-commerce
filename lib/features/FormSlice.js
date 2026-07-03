import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserRegister = createAsyncThunk(
  "User/Register",
  async ({ data }) => {
    const res = await fetch(
      "https://e-commerce-backend-nine-olive.vercel.app/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.userName,
          password: data.password,
        }),
      },
    );
    return res;
  },
);

const initialState = {
  isRegisterLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers(builder) {
    (builder
      .addCase(fetchUserRegister.pending, (state) => {
        console.log(state.isRegisterLoading);
        state.isRegisterLoading = true;
      })
      .addCase(fetchUserRegister.fulfilled, (state) => {
        console.log(state.isRegisterLoading);
        state.isRegisterLoading = false;
      })
      .addCase(fetchUserRegister.rejected),
      (state) => {
        console.log(state.isRegisterLoading);
        state.isRegisterLoading = false;
      });
  },
});

export default userSlice.reducer;
