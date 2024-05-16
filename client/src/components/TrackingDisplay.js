import React from "react";
import { useSelector } from "react-redux";

import { selectAllProducts } from "../features/products/productsSlice";
import { selectActiveLocation } from "../features/locations/locationsSlice";
import { selectAllOrders } from "../features/orders/ordersSlice";
import { selectQuery, selectCategory, selectStartDate, selectEndDate, selectSortByAverage } from "../features/productOrders/productOrdersSlice";

function TrackingDisplay() {

    const products = useSelector(selectAllProducts);
    const query = useSelector(selectQuery).toLowerCase();
    const category = useSelector(selectCategory);
    const startDate = useSelector(selectStartDate);
    const endDate = useSelector(selectEndDate);
    const activeLocation = useSelector(selectActiveLocation);
    const sortByAverage = useSelector(selectSortByAverage);
    const orders = useSelector(selectAllOrders);
    
    const filteredProducts = products.filter((product) => {
        if (category === null) {
            return product.name.toLowerCase().includes(query.toLowerCase());
        } else {
            return product.category.id === category && product.name.toLowerCase().includes(query.toLowerCase());
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
            if (sortByAverage === true) {
                if (quantity !== 0) {
                    const average = Math.round(quantity / orders.length);
                    return {name: name, quantity: average}
                }
                return {name: name, quantity: quantity};
            }
            return {name: name, quantity: quantity};
        }
    }).filter((amount) => amount.quantity !== 0);

    return (
        <div>
            {amounts.length === 0 ?
                <h1>No Products to Show</h1>
                :
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
            }
        </div>
    );
}

export default TrackingDisplay;