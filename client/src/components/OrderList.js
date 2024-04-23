import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllOrders, selectActiveOrder, setActiveOrder } from "../features/orders/ordersSlice";
import { setOrderDisplay } from "../features/display/displaySlice";

function OrderList() {

    const dispatch = useDispatch()
    const orders = useSelector(selectAllOrders)
    const activeOrder = useSelector(selectActiveOrder)
    const activeLocation = useSelector((state) => state.locations.activeLocation)

    const ordersToShow = orders.filter((order) => {
        if (activeLocation === "all") {
            return true
        } else return order.location.name === activeLocation
    })

    return (
        <div className="list">
            {ordersToShow.map(function(order) {
                if (activeOrder) {
                    if (activeOrder.id === order.id) {
                        return (
                            <p
                                className={"active-option"}
                                key={order.id}
                                onClick={() => {
                                    dispatch(setOrderDisplay("details"))
                                    dispatch(setActiveOrder(order))
                                }}
                            >
                                {order.location.name} {order.date.split(" ")[0]}
                            </p>
                        )
                    }
                }
                return (
                    <p
                        className={order === activeOrder ? "active-option" : "clickable"}
                        key={order.id}
                        onClick={() => {
                            dispatch(setOrderDisplay("details"))
                            dispatch(setActiveOrder(order))
                        }}
                    >
                        {order.location.name} {order.date.split(" ")[0]}
                    </p>
                )
            })}
        </div>
    );
}

export default OrderList;