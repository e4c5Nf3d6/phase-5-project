import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    home: "options",
    product: "details",
    order: "details",
    createOrder: "upload"
};

export const displaySlice = createSlice({
    name: "display",
    initialState,
    reducers: {
        setHomeDisplay(state, action) {
            state.home = action.payload;
        },
        resetHomeDisplay(state) {
            state.home = "options";
        },
        setProductDisplay(state, action) {
            state.product = action.payload;
        },
        setOrderDisplay(state, action) {
            state.order = action.payload;
        },
        setCreateOrderDisplay(state, action) {
            state.createOrder = action.payload;
        }
    }
});

export const selectCreateOrderDisplay = state => state.display.createOrder;

export const selectHomeDisplay = state => state.display.home;

export const selectOrderDisplay = state => state.display.order;

export const selectProductDisplay = state => state.display.product;

export const { setHomeDisplay, resetHomeDisplay, setProductDisplay, setOrderDisplay, setCreateOrderDisplay } = displaySlice.actions;

export default displaySlice.reducer;