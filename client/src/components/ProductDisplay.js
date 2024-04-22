import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectActiveProduct } from "../features/products/productsSlice";
import { setProductDisplay } from "../features/display/displaySlice";
import ProductDetails from "./ProductDetails";
import EditProduct from "./EditProduct";
import ProductHistory from "./ProductHistory";

function ProductDisplay() {

    const product = useSelector(selectActiveProduct)
    const display = useSelector((state) => state.display.product)
    const dispatch = useDispatch()

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
                    onClick={() => dispatch(setProductDisplay("details"))}
                >Details</button>
                <button 
                    className={display === "edit" ? "active" : "clickable"}
                    onClick={() => dispatch(setProductDisplay("edit"))}
                >Edit</button>
                <button 
                    className={display === "history" ? "active" : "clickable"}
                    onClick={() => dispatch(setProductDisplay("history"))}
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