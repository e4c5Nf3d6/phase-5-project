import React from "react";
import { useSelector } from "react-redux";

import { selectActiveOrder } from "../features/orders/ordersSlice";

function OrderProducts() {

    const order = useSelector(selectActiveOrder)

    const sortedProductOrders = order.product_orders.toSorted((a, b) => {
        if (a.product.name < b.product.name) {
            return -1;
        } else return 1;
    }).toSorted((a, b) => {
        if (a.product.category.name < b.product.category.name) {
            return -1;
        } else return 1;
    });

    return (
        <div>
            {order.product_orders.length === 0 ?
                <h2>No Products</h2>
                :
                <div className="details">
                    {sortedProductOrders.map((product_order) => {
                        return ([
                            <p key={product_order.id}><strong>{product_order.product.name}</strong></p>,
                            <p key={`${product_order.id}b`}>{product_order.quantity}</p>                            
                        ])
                    })}
                </div>
            }
        </div>
    );
}

export default OrderProducts;