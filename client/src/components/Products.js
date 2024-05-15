import React from "react";

import ProductDisplay from "./ProductDisplay";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";

import useDocumentTitle from "../hooks/useDocumentTitle";

function Products() {

    useDocumentTitle('Products');

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