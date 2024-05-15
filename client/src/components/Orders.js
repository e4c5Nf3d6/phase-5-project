import React from "react";

import OrderList from "./OrderList";
import OrderDisplay from "./OrderDisplay";

import useDocumentTitle from "../hooks/useDocumentTitle";

function Orders() {

    useDocumentTitle('Orders');
    
    return (
        <div className="display-page">
            <OrderList />
            <OrderDisplay />
        </div>
    );
}

export default Orders;