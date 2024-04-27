import React from "react";

import ProductDisplay from "./ProductDisplay";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";

function Products() {

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