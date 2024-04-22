import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    orders: [],
    activeOrder: null
}

export const fetchOrders = createAsyncThunk(
    "orders/fetchorders", 
    async () => {
        const response = await axios.get("/orders")
        return response.data
    }
);

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setActiveOrder(state, action) {
            state.activeOrder = action.payload 
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders = action.payload.reverse()
            })
    }
});

export const selectAllOrders = state => state.orders.orders

export const selectActiveOrder = state => state.orders.activeOrder

export const { setActiveOrder } = ordersSlice.actions;

export default ordersSlice.reducer;