import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveOrder } from "../features/orders/ordersSlice";
import { setOrderDisplay } from "../features/display/displaySlice";
import EditProductOrder from "./EditProductOrder";

function EditOrder() {

    const dispatch = useDispatch()
    const order = useSelector(selectActiveOrder)

    if (order.product_orders.length === 0) {
        return (
            <h2>No Products</h2>
        )
    }

    return (
        <div>
            <div className="edit-order">
                {order.product_orders.map((productOrder) => {
                    return ( 
                        <EditProductOrder key={`${productOrder.id}`} productOrder={productOrder} />
                    )
                })}
            </div>
            <button id="add-product-order" onClick={() => dispatch(setOrderDisplay("add"))}>+</button>
        </div>

    );
}

export default EditOrder;