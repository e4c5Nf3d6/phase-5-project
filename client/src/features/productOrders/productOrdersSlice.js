import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();

if (dd < 10) dd = "0" + dd;
if (mm < 10) mm = "0" + mm;

const formattedToday = yyyy + "-" + mm + "-" + dd;

const initialState = {
    productOrders: [],
    activeProductOrder: null,
    query: "",
    category: null,
    startDate: formattedToday,
    endDate: formattedToday
}

export const fetchProductOrders = createAsyncThunk(
    "productOrders/fetchProductOrders", 
    async () => {
        const response = await axios.get("/product_orders")
        return response.data
    }
);

export const patchProductOrder = createAsyncThunk(
    "productOrders/patchProductOrder", 
    async (values) => {
        const response = await axios.patch(`/product_orders/${values.id}`, values)
        return response.data
    }
)

export const productOrdersSlice = createSlice({
    name: "productOrders",
    initialState,
    reducers: {
        setStartDate(state, action) {
            state.startDate = action.payload 
        },    
        setEndDate(state, action) {
            state.endDate = action.payload 
        },
        setQuery(state, action) {
            state.query = action.payload
        },
        setCategory(state, action) {
            state.category = action.payload
        },
        setActiveProductOrder(state, action) {
            state.activeProductOrder = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProductOrders.fulfilled, (state, action) => {
                state.productOrders = action.payload.sort((a, b) => b.quantity - a.quantity)
            })
            .addCase(patchProductOrder.fulfilled, (state, action) => {
                state.productOrders = state.productOrders.map((productOrder) => {
                    if (productOrder.id === action.payload.id) {
                        return action.payload
                    } else return productOrder
                })
            })
    }
});

export const selectAllProductOrders = state => state.productOrders.productOrders

export const { setStartDate, setEndDate, setQuery, setCategory, setActiveProductOrder } = productOrdersSlice.actions;

export default productOrdersSlice.reducer;