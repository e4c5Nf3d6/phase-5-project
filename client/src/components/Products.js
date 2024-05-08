import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import ProductDisplay from "./ProductDisplay";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";

import useDocumentTitle from "../hooks/useDocumentTitle";
import { fetchProductOrders } from "../features/productOrders/productOrdersSlice";
import { fetchProducts } from "../features/products/productsSlice";

function Products() {

    useDocumentTitle('Products');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductOrders());
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div>
            <ProductFilter />
            <div className="display-page">
                <ProductList />
                <ProductDisplay />
            </div>
        </div>
    );
}

export default Products;