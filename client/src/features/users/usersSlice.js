import { createSlice } from "@reduxjs/toolkit";

const initialState = [{id: 1, username: "Maria", admin: true}]

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser(state, action) {
            state.push(action.payload)
        },
        deleteUser(state, action) {
            return state.filter((user) => user.id !== action.payload)
        },
        editUser(state, action) {
            const user = state.find((user) => user.id === action.payload.id)
            user.username = action.payload.username
            user.admin = action.payload.username
        }
    }
});

export const { addUser, deleteUser, editUser } = usersSlice.actions;

export default usersSlice.reducer;