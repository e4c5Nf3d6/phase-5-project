import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import TrackingFilter from "./TrackingFilter";
import TrackingDisplay from "./TrackingDisplay";

import useDocumentTitle from "../hooks/useDocumentTitle";
import { fetchProductOrders } from "../features/productOrders/productOrdersSlice";

function Tracking() {

    useDocumentTitle('Tracking');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductOrders());
    }, [dispatch]);

    return (
        <div>
            <TrackingFilter />
            <TrackingDisplay />
        </div>
    );
}

export default Tracking;