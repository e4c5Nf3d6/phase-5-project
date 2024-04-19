import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    id: null,
    username: null,
    admin: null
}

export const login = createAsyncThunk(
    "user/login", 
    async (values) => {
        const response = await axios.post("/login", values)
        return response.data
    }
);


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id
            state.username = action.payload.username
            state.admin = action.payload.admin
        },
        resetUser() {
            return initialState
        }
    },
    extraReducers(builder) {
        builder.addCase(login.fulfilled, (state, action) => {
            state.id = action.payload.id
            state.username = action.payload.username
            state.admin = action.payload.admin
        })
    }
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;