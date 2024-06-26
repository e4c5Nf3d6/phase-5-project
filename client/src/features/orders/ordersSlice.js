import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    orders: [],
    activeOrder: null,
    floatingProducts: {
        phorest: [],
        vish: []
    }, 
    floatingCategories: []
};

export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders", 
    async () => {
        const response = await axios.get("/orders");
        return response.data;
    }
);

export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (values) => {
        const formData = new FormData();
        formData.append("location_id", values.location_id);
        formData.append("user_id", values.user_id);

        if (values.phorestPath) {
            formData.append("phorest_file", values.phorestPath);
        } else {
            formData.append("phorest_file", "");
        }

        if (values.vishPath) {
            formData.append("vish_file", values.vishPath);
        } else {
            formData.append("vish_file", "");
        }

        const response = await axios.post("/orders", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            validateStatus: () => true
        });

        if (response.data.error) {
            if (response.data.file === "phorest_file") {
                throw new Error("Invalid Phorest File");
            } else if (response.data.file === "vish_file") {
                throw new Error("Invalid Vish File");
            }
        } else {
            return response.data;
        }
    }
);

export const getOrder = createAsyncThunk(
    "orders/getOrder",
    async (id) => {
        const response = await axios.get(`/orders/${id}`);
        return response.data;
    }
);

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setActiveOrder(state, action) {
            state.activeOrder = action.payload;
        },
        updateActiveOrder(state, action) {
            state.activeOrder = {
                ...state.activeOrder,
                product_orders: state.activeOrder.product_orders.map((productOrder) => {
                    if (productOrder.id === action.payload.id) {
                        return action.payload;
                    } else return productOrder;
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
        },
        removeFloatingProduct(state, action) {
            if (action.payload === "phorest") {
                state.floatingProducts.phorest.shift();
            }
            if (action.payload === "vish") {
                state.floatingProducts.vish.shift();
            }
        },
        removeFloatingVishProduct(state, action) {
            state.floatingProducts.vish = state.floatingProducts.vish.filter((product) => product[0] !== action.payload);
        },
        removeFloatingVishProducts(state, action) {
            state.floatingProducts.vish = state.floatingProducts.vish.filter((product) => product[2] !== action.payload);
        },
        removeFloatingCategory(state) {
            state.floatingCategories.shift();
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.orders = action.payload.reverse();
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.orders.unshift(action.payload.order);
                state.floatingProducts.phorest = action.payload.phorest_products_to_add;
                state.floatingProducts.vish = action.payload.vish_products_to_add;
                state.floatingCategories = action.payload.categories_to_add;
            })
    }
});

export const selectAllOrders = state => state.orders.orders;

export const selectActiveOrder = state => state.orders.activeOrder;

export const selectFloatingProducts = state => state.orders.floatingProducts;

export const selectFloatingCategories = state => state.orders.floatingCategories;

export const { 
    setActiveOrder, 
    updateActiveOrder, 
    removeProductFromOrder, 
    addProductToOrder, 
    removeFloatingProduct, 
    removeFloatingVishProduct, 
    removeFloatingCategory,
    removeFloatingVishProducts 
} = ordersSlice.actions;

export default ordersSlice.reducer;