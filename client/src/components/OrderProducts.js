import React from "react";
import { useSelector } from "react-redux";

import { selectActiveOrder } from "../features/orders/ordersSlice";

function OrderProducts() {

    const order = useSelector(selectActiveOrder)

    if (order.product_orders.length === 0) {
        return (
            <h2>No Products</h2>
        )
    }

    return (
        <div className="details">
            {order.product_orders.map((product_order) => {
                return ([
                    <p key={product_order.id}><strong>{product_order.product.name}</strong></p>,
                    <p key={`${product_order.id}b`}>{product_order.quantity}</p>                            
                ])
            })}
        </div>
    );
}

export default OrderProducts;