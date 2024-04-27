import React from "react";
import { useSelector } from "react-redux";

import { selectAllProductOrders } from "../features/productOrders/productOrdersSlice";

function ProductHistory({ product }) {

    const activeLocation = useSelector((state) => state.locations.activeLocation);
    const productOrders = useSelector(selectAllProductOrders).filter((productOrder) => productOrder.product.id === product.id);

    const filteredProductOrders = productOrders.filter((productOrder) => {
        if (activeLocation === "all") {
            return true;
        } else return productOrder.order.location.name === activeLocation;
    });
    
    if (filteredProductOrders.length === 0) {
        return (
            <h2>No Order History Found</h2>
        );
    }

    return (
        <div className="details">
            {filteredProductOrders.map((productOrder) => {
                return([
                    <p key={productOrder.id}><strong>{productOrder.order.date.split(" ")[0]}</strong></p>,
                    <p key={`${productOrder.id}b`}>{productOrder.quantity}</p>
                ]);
            })}
        </div>
    );
}

export default ProductHistory;