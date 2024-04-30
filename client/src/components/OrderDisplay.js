import React from "react";
import { useDispatch, useSelector } from "react-redux";

import OrderDetails from "./OrderDetails";
import OrderProducts from "./OrderProducts";
import EditOrder from "./EditOrder";
import AddProductOrder from "./AddProductOrder";
import OrderPDF from "./OrderPDF";

import { selectActiveOrder } from "../features/orders/ordersSlice";
import { setOrderDisplay } from "../features/display/displaySlice";

function OrderDisplay() {

    const dispatch = useDispatch();

    const order = useSelector(selectActiveOrder);
    const display = useSelector((state) => state.display.order);

    if (!order) {
        return (
            <h1>Select an Order</h1>
        );
    }
    
    return (
        <div className="display">
            <h1>Order No.{order.id}</h1>
            <div className="order-display-options">
                <button 
                    className={display === "details" ? "active" : "clickable"}
                    onClick={() => dispatch(setOrderDisplay("details"))}
                >Details</button>
                <button 
                    className={display === "products" ? "active" : "clickable"}
                    onClick={() => dispatch(setOrderDisplay("products"))}
                >Products</button>
                <button 
                    className={display === "edit" ? "active" : "clickable"}
                    onClick={() => dispatch(setOrderDisplay("edit"))}
                >Edit</button>
                <button 
                    className={display === "pdf" ? "active" : "clickable"}
                    onClick={() => dispatch(setOrderDisplay("pdf"))}
                >PDF</button>
            </div>
            <div className="box">
                {display === "details" ? <OrderDetails /> : null}
                {display === "products" ? <OrderProducts /> : null}
                {display === "edit" ? <EditOrder /> : null}
                {display === "add" ? <AddProductOrder /> : null}
                {display === 'pdf' ? <OrderPDF order={order} /> : null}
            </div>
        </div>
    );
}

export default OrderDisplay;





