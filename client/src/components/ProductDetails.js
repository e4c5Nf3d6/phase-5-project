import React from "react";

function ProductDetails({ product }) {

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