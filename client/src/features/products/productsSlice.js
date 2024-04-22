import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    activeProduct: null,
    categories: [],
    activeCategory: null,
    productQuery: ""
}

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts", 
    async () => {
        const response = await axios.get("/products")
        return response.data
    }
);

export const fetchProductCategories = createAsyncThunk(
    "products/fetchProductCategories", 
    async () => {
        const response = await axios.get("/categories")
        return response.data
    }
);

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setActiveProduct(state, action) {
            state.activeProduct = action.payload 
        },
        setActiveCategory(state, action) {
            state.activeCategory = action.payload
        },
        setQuery(state, action) {
            state.productQuery = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(fetchProductCategories.fulfilled, (state, action) => {
                state.categories = action.payload
            })
    }
});

export const selectAllProducts = state => state.products.products

export const selectActiveProduct = state => state.products.activeProduct

export const selectAllCategories = state => state.products.categories

export const selectActiveCategory = state => state.products.activeCategory

export const selectProductQuery = state => state.products.productQuery

export const { setActiveProduct, setActiveCategory, setQuery } = productSlice.actions;

export default productSlice.reducer;