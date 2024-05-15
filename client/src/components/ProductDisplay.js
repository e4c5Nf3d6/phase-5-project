import React from "react";
import { useSelector, useDispatch } from "react-redux";

import ProductDetails from "./ProductDetails";
import EditProduct from "./EditProduct";
import ProductHistory from "./ProductHistory";

import { selectActiveProduct } from "../features/products/productsSlice";
import { setProductDisplay } from "../features/display/displaySlice";

function ProductDisplay() {

    const dispatch = useDispatch();

    const product = useSelector(selectActiveProduct);
    const display = useSelector((state) => state.display.product);

    return (
        <div>
            {product ? 
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
                        {display === "details" ? <ProductDetails /> : null}
                        {display === "edit" ? <EditProduct /> : null}
                        {display === "history" ? <ProductHistory product={product} /> : null}
                    </div>
                </div>
                : <h1>Select a Product</h1>
            }
        </div>
    );
}

export default ProductDisplay;