import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDisplay } from "../features/display/displaySlice";
import AddUser from "./AddUser";

function Home() {
    const display = useSelector((state) => state.display)
    const dispatch = useDispatch()

    if (display.component === 'addUser') {
        return ( 
            <AddUser />
        )
    }

    return (
        <div id="options">
            <button className="option" onClick={() => dispatch(setDisplay('addUser'))}>Add User</button> 
        </div>

    )
};

export default Home;