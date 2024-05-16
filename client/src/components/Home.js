import React from "react";
import { useSelector, useDispatch } from "react-redux";

import AddUser from "./AddUser";
import AddLocation from "./AddLocation";
import AddProduct from "./AddProduct";
import CreateOrder from "./CreateOrder";

import useDocumentTitle from "../hooks/useDocumentTitle";
import { setHomeDisplay } from "../features/display/displaySlice";
import userSlice from "../features/user/userSlice";

function Home() {

    useDocumentTitle('Home');

    const dispatch = useDispatch();

    const display = useSelector((state) => state.display.home);
    const isAdmin = useSelector((state) => state.user.admin);

    return (
        <div>
            {display === 'options' ? 
                <div id="home">
                    <div id="options">
                        <button className="option" onClick={() => dispatch(setHomeDisplay('addOrder'))}>Create Order</button> 
                    </div>
                    <div id="options">
                        <button className="option" onClick={() => dispatch(setHomeDisplay('addProduct'))}>Add Product</button> 
                        {isAdmin ? 
                            <div>
                                <button className="option" onClick={() => dispatch(setHomeDisplay('addUser'))}>Add User</button> 
                                <button className="option" onClick={() => dispatch(setHomeDisplay('addLocation'))}>Add Location</button> 
                            </div>                        
                            : null
                        }
                    </div>
                </div>
                : null
            }
            {display === "addUser" ? <AddUser /> : null}
            {display === "addLocation" ? <AddLocation /> : null}
            {display === "addProduct" ? <AddProduct /> : null}
            {display === "addOrder" ? <CreateOrder /> : null}
        </div>
    );
}

export default Home;