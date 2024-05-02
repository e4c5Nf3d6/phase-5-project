import React from "react";
import { useDispatch, useSelector } from "react-redux";

import EditProductOrder from "./EditProductOrder";

import { selectActiveOrder } from "../features/orders/ordersSlice";
import { setOrderDisplay } from "../features/display/displaySlice";

function EditOrder() {

    const dispatch = useDispatch();

    const order = useSelector(selectActiveOrder);

    const sortedProductOrders = order.product_orders.toSorted((a, b) => {
        if (a.product.name < b.product.name) {
            return -1;
        } else return 1;
    }).toSorted((a, b) => {
        if (a.product.category.name < b.product.category.name) {
            return -1;
        } else return 1;
    });

    if (order.product_orders.length === 0) {
        return (
            <>
                <h2>No Products</h2>
                <button id="add-product-order" onClick={() => dispatch(setOrderDisplay("add"))}>+</button>
            </>
        );
    }

    return (
        <div>
            <div className="edit-order">
                {sortedProductOrders.map((productOrder) => {
                    return ( 
                        <EditProductOrder key={`${productOrder.id}`} productOrder={productOrder} />
                    );
                })}
            </div>
            <button id="add-product-order" onClick={() => dispatch(setOrderDisplay("add"))}>+</button>
        </div>

    );
}

export default EditOrder;