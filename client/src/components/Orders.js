import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import OrderList from "./OrderList";
import OrderDisplay from "./OrderDisplay";

import useDocumentTitle from "../hooks/useDocumentTitle";
import { fetchOrders } from "../features/orders/ordersSlice";

function Orders() {

    useDocumentTitle('Orders');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);
    
    return (
        <div className="display-page">
            <OrderList />
            <OrderDisplay />
        </div>
    );
}

export default Orders;