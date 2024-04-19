import React from "react";
import { useDispatch } from "react-redux";
import { resetDisplay } from "../features/display/displaySlice";

function BackArrow() {
    const dispatch = useDispatch()

    return (
        <button id="back-button" onClick={() => dispatch(resetDisplay())}>
            <img id="back" src="/backarrow.png" alt="back arrow" />
        </button>      
    )
}

export default BackArrow