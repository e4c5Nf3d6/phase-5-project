import React from "react";
import { useSelector } from "react-redux";

import { selectAllProducts } from "../features/products/productsSlice";

function TrackingDisplay() {

    const products = useSelector(selectAllProducts);
    const query = useSelector((state) => state.productOrders.query).toLowerCase();
    const category = useSelector((state) => state.productOrders.category);
    const startDate = useSelector((state) => state.productOrders.startDate);
    const endDate = useSelector((state) => state.productOrders.endDate);
    const activeLocation = useSelector((state) => state.locations.activeLocation);

    const filteredProducts = products.filter((product) => {
        if (category === null) {
            return product.name.toLowerCase().includes(query.toLowerCase());
        } else {
            return product.category.name === category && product.name.toLowerCase().includes(query.toLowerCase());
        }
    });

    const amounts = filteredProducts.map((product) => {
        if (product.product_orders) {
            const name = product.name;
            const quantity = product.product_orders.filter((productOrder) => {
                const orderDate = productOrder.order.date.split(" ")[0];
                if (activeLocation === "all") {
                    return startDate <= orderDate && endDate >= orderDate;
                } else return productOrder.order.location.name === activeLocation && startDate <= orderDate && endDate >= orderDate;
            }).reduce((sum, productOrder) => sum + productOrder.quantity, 0);
            return {name: name, quantity: quantity};
        }
    }).filter((amount) => amount.quantity !== 0);

    if (amounts.length === 0) {
        return (
            <h1>No Products to Show</h1>
        );
    }

    return (
        <div className="display">
            <h1>Top Products</h1>
            <div className="box">
                <div className="details">
                    {amounts.sort((a, b) => b.quantity - a.quantity).map((amount) => {
                        return ([
                            <p key={amount.name}><strong>{amount.name}</strong></p>,
                            <p key={`${amount.name}q`}>{amount.quantity}</p>                           
                        ]);
                    })}
                </div>
            </div>
        </div>
    );
}

export default TrackingDisplay;