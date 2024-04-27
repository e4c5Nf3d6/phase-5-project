import React from "react";
import { useSelector } from "react-redux";

import { selectActiveOrder } from "../features/orders/ordersSlice";

function OrderDetails() {

    const order = useSelector(selectActiveOrder);

    return (
        <div className="details">
            <p><strong>Location</strong></p>
            <p>{order.location.name}</p>
            <p><strong>Date</strong></p>
            <p>{order.date.split(" ")[0]}</p>
            <p><strong>Created by</strong></p>
            <p>{order.user.username}</p>
        </div>
    );
}

export default OrderDetails;