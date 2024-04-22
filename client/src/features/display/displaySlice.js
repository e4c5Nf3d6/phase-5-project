import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    home: null,
    product: "details"
}

export const displaySlice = createSlice({
    name: "display",
    initialState,
    reducers: {
        setHomeDisplay(state, action) {
            state.home = action.payload
        },
        resetHomeDisplay() {
            return initialState
        },
        setProductDisplay(state, action) {
            state.product = action.payload
        }
    },
});

export const { setHomeDisplay, resetHomeDisplay, setProductDisplay } = displaySlice.actions;

export default displaySlice.reducer;