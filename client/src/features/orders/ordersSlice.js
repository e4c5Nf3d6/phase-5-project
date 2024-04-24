import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    orders: [],
    activeOrder: null
}

export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders", 
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
        updateActiveOrder(state, action) {
            state.activeOrder = {
                ...state.activeOrder,
                product_orders: state.activeOrder.product_orders.map((productOrder) => {
                    if (productOrder.id === action.payload.id) {
                        return action.payload
                    } else return productOrder
                })
            }
        },
        removeProductFromOrder(state, action) {
            state.activeOrder = {
                ...state.activeOrder,
                product_orders: state.activeOrder.product_orders.filter((productOrder) => productOrder.id !== action.payload.deleted)
            }
        },
        addProductToOrder(state, action) {
            state.activeOrder = {
                ...state.activeOrder,
                product_orders: [...state.activeOrder.product_orders, action.payload]
            }
        }
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

export const { setActiveOrder, updateActiveOrder, removeProductFromOrder, addProductToOrder } = ordersSlice.actions;

export default ordersSlice.reducer;