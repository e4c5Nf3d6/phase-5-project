import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    id: null,
    username: null,
    admin: null
};

export const login = createAsyncThunk(
    "user/login", 
    async (values) => {
        const response = await axios.post("/login", values);
        return response.data;
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async (id) => {
        await axios.delete("/logout", id);
    }
);

export const checkSession = createAsyncThunk(
    "user/checkSession",
    async () => {
        const response = await axios.get("/check_session");
        return response.data;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.admin = action.payload.admin;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.id = action.payload.id;
                state.username = action.payload.username;
                state.admin = action.payload.admin;
            })
            .addCase(logout.fulfilled, () => {
                return initialState;
            })
            .addCase(checkSession.fulfilled, (state, action) => {
                state.id = action.payload.id;
                state.username = action.payload.username;
                state.admin = action.payload.admin;
            })
    }
});

export const selectUser = state => state.user;

export const selectUserID = state => state.user.id;

export const selectAdmin = state => state.user.admin;

export const { setUser } = userSlice.actions;

export default userSlice.reducer;