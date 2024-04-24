import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import TrackingFilter from "./TrackingFilter";
import TrackingDisplay from "./TrackingDisplay";

function Tracking() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <div>
            <TrackingFilter />
            <TrackingDisplay />
        </div>
    );
}

export default Tracking;