import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import usersReducer from "../features/users/usersSlice";
import displayReducer from "../features/display/displaySlice";
import locationsReducer from "../features/locations/locationsSlice";
import productsReducer from "../features/products/productsSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        users: usersReducer,
        display: displayReducer,
        locations: locationsReducer,
        products: productsReducer
    },
});
