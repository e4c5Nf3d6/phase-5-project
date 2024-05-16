import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import TrackingFilter from "./TrackingFilter";
import TrackingDisplay from "./TrackingDisplay";

import useDocumentTitle from "../hooks/useDocumentTitle";
import { fetchProducts } from "../features/products/productsSlice";

function Tracking() {

    useDocumentTitle('Tracking');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div>
            <TrackingFilter />
            <TrackingDisplay />
        </div>
    );
}

export default Tracking;