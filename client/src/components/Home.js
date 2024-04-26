import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setHomeDisplay } from "../features/display/displaySlice";
import AddUser from "./AddUser";
import AddLocation from "./AddLocation";
import AddProduct from "./AddProduct";
import CreateOrder from "./CreateOrder";

function Home() {
    const display = useSelector((state) => state.display.home)
    const dispatch = useDispatch()

    if (display === 'addUser') {
        return ( 
            <AddUser />
        )
    }

    if (display === 'addLocation') {
        return (
            <AddLocation />
        )
    }

    if (display === 'addProduct') {
        return (
            <AddProduct />
        )
    }

    if (display === 'addOrder') {
        return (
            <CreateOrder />
        )
    }

    return (
        <div id="home">
            <div id="options">
                <button className="option" onClick={() => dispatch(setHomeDisplay('addOrder'))}>Create Order</button> 
            </div>
            <div id="options">
                <button className="option" onClick={() => dispatch(setHomeDisplay('addUser'))}>Add User</button> 
                <button className="option" onClick={() => dispatch(setHomeDisplay('addLocation'))}>Add Location</button> 
                <button className="option" onClick={() => dispatch(setHomeDisplay('addProduct'))}>Add Product</button> 
            </div>
        </div>

    )
};

export default Home;