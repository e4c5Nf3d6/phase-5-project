import React from "react";
import { useDispatch } from "react-redux";

import TrackingFilter from "./TrackingFilter";
import TrackingDisplay from "./TrackingDisplay";

import useDocumentTitle from "../hooks/useDocumentTitle";

function Tracking() {

    useDocumentTitle('Tracking');

    return (
        <div>
            <TrackingFilter />
            <TrackingDisplay />
        </div>
    );
}

export default Tracking;