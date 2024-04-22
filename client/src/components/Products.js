import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductDisplay from "./ProductDisplay";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";
import { fetchProducts } from "../features/products/productsSlice";

function Products() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

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