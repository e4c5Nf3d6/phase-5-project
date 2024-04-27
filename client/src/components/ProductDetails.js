import React from "react";
import { useSelector } from "react-redux";

import { selectActiveProduct } from "../features/products/productsSlice";

function ProductDetails() {
    
    const product = useSelector(selectActiveProduct);

    return (
        <div className="details">
            <p><strong>Product Name</strong></p>
            <p>{product.name}</p>
            <p><strong>Product Category</strong></p>
            <p>{product.category.name}</p>
            <p><strong>Phorest Name</strong></p>
            <p>{product.phorest_name}</p>
            <p><strong>Vish Name</strong></p>
            <p>{product.vish_name}</p>
        </div>
    );
}

export default ProductDetails;