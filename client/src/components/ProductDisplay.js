import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectActiveProduct } from "../features/products/productsSlice";
import ProductDetails from "./ProductDetails";
import EditProduct from "./EditProduct";
import ProductHistory from "./ProductHistory";

function ProductDisplay() {

    const [display, setDisplay] = useState("details")
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
                <button 
                    className={display === "details" ? "active" : "clickable"}
                    onClick={() => setDisplay("details")}
                >Details</button>
                <button 
                    className={display === "edit" ? "active" : "clickable"}
                    onClick={() => setDisplay("edit")}
                >Edit</button>
                <button 
                    className={display === "history" ? "active" : "clickable"}
                    onClick={() => setDisplay("history")}
                >History</button>
            </div>
            <div className="box">
                {display === "details" ? <ProductDetails product={product} /> : null}
                {display === "edit" ? <EditProduct product={product} /> : null}
                {display === "history" ? <ProductHistory product={product} /> : null}
            </div>
        </div>
    );
}

export default ProductDisplay;