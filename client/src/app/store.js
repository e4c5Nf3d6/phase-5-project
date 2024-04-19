import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import usersReducer from "../features/users/usersSlice";
import displayReducer from "../features/display/displaySlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        users: usersReducer,
        display: displayReducer
    },
});
