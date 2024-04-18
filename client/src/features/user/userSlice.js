import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    username: null,
    admin: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id
            state.username = action.payload.username
            state.admin = action.payload.admin
        },
        resetUser: () => {
            return initialState
        }
    },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;