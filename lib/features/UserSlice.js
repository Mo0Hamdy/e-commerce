import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    firstName: 'Account',
    userProducts:[]
}

export const UserSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        changeUser: (currentState,action) => {
            currentState.firstName = action.payload.firstName;
        }
    }

})

export const { changeUser } = UserSlice.actions;
export default UserSlice.reducer;