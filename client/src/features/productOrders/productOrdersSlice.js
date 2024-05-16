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
    endDate: formattedToday,
    sortByAverage: false
};

export const fetchProductOrders = createAsyncThunk(
    "productOrders/fetchProductOrders", 
    async () => {
        const response = await axios.get("/product_orders");
        return response.data;
    }
);

export const addProductOrder = createAsyncThunk(
    "productOrders/addProductOrder",
    async (values) => {
        const response = await axios.post("/product_orders", values);
        return response.data;
    }
);

export const patchProductOrder = createAsyncThunk(
    "productOrders/patchProductOrder", 
    async (values) => {
        const response = await axios.patch(`/product_orders/${values.id}`, values);
        return response.data;
    }
);

export const deleteProductOrder = createAsyncThunk(
    "productOrders/deleteProductOrder",
    async (id) => {
        const response = await axios.delete(`/product_orders/${id}`);
        return response.data;
    }
);

export const productOrdersSlice = createSlice({
    name: "productOrders",
    initialState,
    reducers: {
        setStartDate(state, action) {
            state.startDate = action.payload;
        },    
        setEndDate(state, action) {
            state.endDate = action.payload;
        },
        setQuery(state, action) {
            state.query = action.payload;
        },
        setCategory(state, action) {
            state.category = action.payload;
        },
        setSortByAverage(state, action) {
            state.sortByAverage = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProductOrders.fulfilled, (state, action) => {
                state.productOrders = action.payload.sort((a, b) => b.quantity - a.quantity);
            })
            .addCase(addProductOrder.fulfilled, (state, action) => {
                state.productOrders.push(action.payload);
            })
            .addCase(patchProductOrder.fulfilled, (state, action) => {
                state.productOrders = state.productOrders.map((productOrder) => {
                    if (productOrder.id === action.payload.id) {
                        return action.payload;
                    } else return productOrder;
                });
            })
            .addCase(deleteProductOrder.fulfilled, (state, action) => {
                state.productOrders = state.productOrders.filter((productOrder) => productOrder.id !== action.payload.deleted);
            })
    }
});

export const selectAllProductOrders = state => state.productOrders.productOrders;

export const selectQuery = state => state.productOrders.query;

export const selectCategory = state => state.productOrders.category;

export const selectStartDate = state => state.productOrders.startDate;

export const selectEndDate = state => state.productOrders.endDate;

export const selectSortByAverage = state => state.productOrders.sortByAverage;

export const { setStartDate, setEndDate, setQuery, setCategory, setSortByAverage } = productOrdersSlice.actions;

export default productOrdersSlice.reducer;