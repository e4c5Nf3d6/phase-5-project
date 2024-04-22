import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, selectAllOrders } from "../features/orders/ordersSlice";
import OrderList from "./OrderList";
import OrderDisplay from "./OrderDisplay";

function Orders() {

    const dispatch = useDispatch();
    const orders = useSelector(selectAllOrders)

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch])
    
    return (
        <div className="display-page">
            <OrderList />
            <OrderDisplay />
        </div>
    );
}

export default Orders;