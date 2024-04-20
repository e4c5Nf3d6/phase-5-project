import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [{id: 1, username: "Maria", admin: true}]

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers", 
    async () => {
        const response = await axios.get("/users")
        return response.data
    }
);

export const addUser = createAsyncThunk(
    "users/addUser",
    async (values) => {
        const response = await axios.post("/users", values)
        return response.data
    }
);

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        // addUser(state, action) {
        //     state.push(action.payload)
        // },
        deleteUser(state, action) {
            return state.filter((user) => user.id !== action.payload)
        },
        editUser(state, action) {
            const user = state.find((user) => user.id === action.payload.id)
            user.username = action.payload.username
            user.admin = action.payload.username
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.push(action.payload)
            })
    }
});

export const selectAllUsers = state => state.users

export const selectUser = (state, id) => state.find(user => user.id === id);

export const { deleteUser, editUser } = usersSlice.actions;

export default usersSlice.reducer;