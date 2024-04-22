import React from "react";
import { useSelector } from "react-redux";
import { selectActiveOrder } from "../features/orders/ordersSlice";


function OrderDisplay() {

    const order = useSelector(selectActiveOrder)

    if (!order) {
        return (
            <h1>Select an Order</h1>
        )
    }
    
    return (
        <div className="display">
            <h1>{order.location.name}</h1>
            <h2>{order.date.split(" ")[0]}</h2>
            <div className="box">
                <p>product orders</p>
            </div>
        </div>
    );
}

export default OrderDisplay;





