import React from "react";
import { useSelector } from "react-redux";
import { selectActiveProduct } from "../features/products/productsSlice";

function ProductDisplay() {

    const product = useSelector(selectActiveProduct)

    if (!product) {
        return (
            <h1>Select a Product</h1>
        )
    }

    return (
        <div className="display">
            <h1>{product.name}</h1>
            <div className="display-options">
                <button className="active">Details</button>
                <button className="clickable">Edit</button>
                <button className="clickable">History</button>
            </div>
            <div className="box">
                <p><strong>Product Name</strong></p>
                <p>{product.name}</p>
                <p><strong>Product Category</strong></p>
                <p>{product.category.name}</p>
                <p><strong>Phorest Name</strong></p>
                <p>{product.phorest_name}</p>
                <p><strong>Vish Name</strong></p>
                <p>{product.vish_name}</p>
            </div>
        </div>
    );
}

export default ProductDisplay;