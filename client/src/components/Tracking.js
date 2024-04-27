import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import TrackingFilter from "./TrackingFilter";
import TrackingDisplay from "./TrackingDisplay";

import { fetchProducts } from "../features/products/productsSlice";

function Tracking() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    return (
        <div>
            <TrackingFilter />
            <TrackingDisplay />
        </div>
    );
}

export default Tracking;