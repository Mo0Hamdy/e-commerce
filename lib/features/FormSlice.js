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
      const result = await res.json();
      if (!res.ok) {
          throw new Error(result.message)
      }
    return result;
  },
);

export const fetchUserLogin = createAsyncThunk(
  "User/Login",
  async ({ data }) => {
    const res = await fetch(
      "https://e-commerce-backend-nine-olive.vercel.app/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.userName,
          password: data.password,
        }),
      },
      );
      const result = await res.json()
      if (!res.ok) {
          throw new Error(result.message)
      }
    return result;
  },
);

const initialState = {
  isRegisterLoading: false,
  isLoginLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchUserRegister.pending, (state) => {
        state.isRegisterLoading = true;
      })
      .addCase(fetchUserRegister.fulfilled, (state) => {
        state.isRegisterLoading = false;
      })
      .addCase(fetchUserRegister.rejected, (state) => {
        state.isRegisterLoading = false;
      })
      .addCase(fetchUserLogin.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(fetchUserLogin.fulfilled, (state) => {
        state.isLoginLoading = false;
      })
      .addCase(fetchUserLogin.rejected, (state) => {
        state.isLoginLoading = false;
      });
  },
});

export default userSlice.reducer;
