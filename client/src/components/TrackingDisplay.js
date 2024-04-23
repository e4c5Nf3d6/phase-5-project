import React from "react";
import { useSelector } from "react-redux";
import { selectAllProductOrders } from "../features/productOrders/productOrdersSlice";

function TrackingDisplay() {

    const productOrders = useSelector(selectAllProductOrders)
    const query = useSelector((state) => state.productOrders.query)
    const category = useSelector((state) => state.productOrders.category)

    const filteredOrders = productOrders.filter((order) => {
        if (category === null) {
            return order.product.name.toLowerCase().includes(query.toLowerCase())
        } else {
            return (order.product.category.name === category && order.product.name.toLowerCase().includes(query.toLowerCase()))
        }
    })

    return (
        <div className="display">
            <h1>Top Products</h1>
            <div className="box">
                <div className="details">
                    {filteredOrders.map((order) => {
                        return ( 
                            <>
                                <p key={order.id}><strong>{order.product.name}</strong></p>
                                <p key={`${order.id}b`}>{order.quantity}</p>                            
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default TrackingDisplay;