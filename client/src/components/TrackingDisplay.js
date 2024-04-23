import React from "react";
import { useSelector } from "react-redux";
import { selectAllProductOrders } from "../features/productOrders/productOrdersSlice";

function TrackingDisplay() {

    const productOrders = useSelector(selectAllProductOrders)
    const query = useSelector((state) => state.productOrders.query).toLowerCase()
    const category = useSelector((state) => state.productOrders.category)
    const startDate = useSelector((state) => state.productOrders.startDate)
    const endDate = useSelector((state) => state.productOrders.endDate)

    const filteredOrders = productOrders.filter((order) => {
        const orderDate = order.order.date.split(" ")[0]
        const productName = order.product.name.toLowerCase()
        const orderCategory = order.product.category.name
        
        if (category === null) {
            return productName.includes(query) && startDate <= orderDate && endDate >= orderDate
        } else {
            return orderCategory === category && productName.includes(query) && startDate <= orderDate && endDate >= orderDate
        }
    })

    if (filteredOrders.length === 0) {
        return (
            <h1>No Products to Show</h1>
        )
    }

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