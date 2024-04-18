import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../features/user/userSlice";

const linkStyles = {
    display: "inline-block",
    textAlign: "center",
    width: "100px",
    padding: "12px",
    margin: "6px 6px 6px",
    background: "white",
    textDecoration: "none",
    color: "black",
};

function NavBar() {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    function handleLogout() {
        fetch("/logout", { method: "DELETE"})
        .then((r) => {
            if (r.ok) {
                dispatch(resetUser())
            }
        });
    }

    if (!user.username) {
        return (
            <h1>Please Log In</h1>
        )
    }
    
    return (
        <div className="navbar">
            <NavLink 
                to='/' 
                exact
                style={linkStyles}
                activeStyle={{
                    background: "#D3D3D3"
                }}
            >
                Home
            </NavLink>
            <h2>{user.username}</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default NavBar;