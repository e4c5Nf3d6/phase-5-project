import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    activeProduct: null,
    categories: [],
    options: [],
    activeCategory: null,
    productQuery: ""
};

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts", 
    async () => {
        const response = await axios.get("/products");
        return response.data;
    }
);

export const fetchProductCategories = createAsyncThunk(
    "products/fetchProductCategories", 
    async () => {
        const response = await axios.get("/categories");
        return response.data;
    }
);

export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (values) => {
        const response = await axios.post("/products", values);
        return response.data;
    }
);

export const editProduct = createAsyncThunk(
    "products/editProduct",
    async (values) => {
        const response = await axios.patch(`/products/${values.id}`, values);
        return response.data;
    }
);

export const addCategory = createAsyncThunk(
    "products/addCategory",
    async (values) => {
        const response = await axios.post("categories", values);
        return response.data;
    }
);

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setActiveProduct(state, action) {
            state.activeProduct = action.payload;
        },
        setActiveCategory(state, action) {
            state.activeCategory = action.payload;
        },
        setQuery(state, action) {
            state.productQuery = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload.sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                    } else return 1;
                });
            })
            .addCase(fetchProductCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.options = action.payload.map((category) => {
                    return({value: category.id, label: category.name});
                });
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.products = state.products.map((product) => {
                    if (product.id === action.payload.id) {
                        return action.payload;
                    } else return product;
                }).sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                    } else return 1;
                });
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.categories.push(action.payload);
                state.options.push({value: action.payload.id, label: action.payload.name});
            })
    }
});

export const selectAllProducts = state => state.products.products;

export const selectActiveProduct = state => state.products.activeProduct;

export const selectAllCategories = state => state.products.categories;

export const selectActiveCategory = state => state.products.activeCategory;

export const selectProductQuery = state => state.products.productQuery;

export const categoryOptions = state => state.products.options;

export const { setActiveProduct, setActiveCategory, setQuery } = productsSlice.actions;

export default productsSlice.reducer;