import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDisplay } from "../features/display/displaySlice";
import AddUser from "./AddUser";
import AddLocation from "./AddLocation";

function Home() {
    const display = useSelector((state) => state.display)
    const dispatch = useDispatch()

    if (display.component === 'addUser') {
        return ( 
            <AddUser />
        )
    }

    if (display.component === 'addLocation') {
        return (
            <AddLocation />
        )
    }

    return (
        <div id="options">
            <button className="option" onClick={() => dispatch(setDisplay('addUser'))}>Add User</button> 
            <button className="option" onClick={() => dispatch(setDisplay('addLocation'))}>Add Location</button> 
        </div>
    )
};

export default Home;