import React from "react";
import { useSelector } from "react-redux";
import { selectActiveOrder } from "../features/orders/ordersSlice";
import EditProductOrder from "./EditProductOrder";

function EditOrder() {
    const order = useSelector(selectActiveOrder)

    if (order.product_orders.length === 0) {
        return (
            <h2>No Products</h2>
        )
    }

    return (
        <div className="edit-order">
            {order.product_orders.map((product_order) => {
                return ( 
                    <EditProductOrder key={`${product_order.id}`} product_order={product_order} />
                )
            })}
        </div>
    );
}

export default EditOrder;