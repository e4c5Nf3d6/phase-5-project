import React from "react";
import { useDispatch } from "react-redux";
import { resetHomeDisplay } from "../features/display/displaySlice";

function BackArrow() {
    const dispatch = useDispatch()

    return (
        <button id="back-button" onClick={() => dispatch(resetHomeDisplay())}>
            <img id="back" src="/backarrow.png" alt="back arrow" />
        </button>      
    )
}

export default BackArrow