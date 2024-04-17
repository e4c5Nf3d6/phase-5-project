import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        id: null,
        username: null,
        admin: null
    },
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id
            state.username = action.payload.username
            state.admin = action.payload.admin
        }
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;