import React, { useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user/userSlice";
import { fetchLocations, selectAllLocations } from "../features/locations/locationsSlice";

const linkStyles = {
    display: "inline-block",
    textAlign: "center",
    width: "100px",
    padding: "12px",
    borderTop: "2px solid white",
    borderBottom: "2px solid white",
    borderRight: "2px solid white",
    background: "#D3D3D3",
    textDecoration: "none",
    color: "black",
};

const firstLinkStyle = {
    display: "inline-block",
    textAlign: "center",
    width: "100px",
    padding: "12px",
    border: "2px solid white",
    borderTopLeftRadius: "15px",
    borderBottomLeftRadius: "15px",
    background: "#D3D3D3",
    textDecoration: "none",
    color: "black",
}

const lastLinkStyle = {
    display: "inline-block",
    textAlign: "center",
    width: "100px",
    padding: "12px",
    borderTop: "2px solid white",
    borderBottom: "2px solid white",
    borderRight: "2px solid white",
    borderTopRightRadius: "15px",
    borderBottomRightRadius: "15px",
    background: "#D3D3D3",
    textDecoration: "none",
    color: "black",
}

function NavBar() {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const locations = useSelector(selectAllLocations)

    useEffect(() => {
        dispatch(fetchLocations())
    }, [dispatch])

    const handleLogout = async (id) => {
        await dispatch(logout(id)).unwrap();
    }

    if (!user.id) {
        return <Redirect to="/login/" />
    }
    
    return (
        <div id="navbar">
            <div id="nav-locations">
                <button id="first-location">All Locations</button>
                {locations.map((location) => {
                    if (locations.findIndex((element) => element === location) === locations.length - 1) {
                        return <button id="last-location">{location.name}</button>
                    } else return <button className="location">{location.name}</button>
                })}
            </div>
            <div id="nav-main">
                <h1>Color Order</h1>
                <div id="nav-links">
                    <NavLink 
                        to="/" 
                        exact
                        style={firstLinkStyle}
                        activeStyle={{
                            background: "#5e7139",
                            color: "white"
                        }}
                    >
                        Home
                    </NavLink>
                    <NavLink 
                        to="/products" 
                        style={linkStyles}
                        activeStyle={{
                            background: "#5e7139",
                            color: "white"
                        }}
                    >
                        Products
                    </NavLink>
                    <NavLink 
                        to="/orders" 
                        style={linkStyles}
                        activeStyle={{
                            background: "#5e7139",
                            color: "white"
                        }}
                    >
                        Orders
                    </NavLink>
                </div>
            </div>
            <div id="nav-profile">
                <div id="user">
                    <div id="circle">
                        <h2>{user.username[0]}</h2>
                    </div>
                    <div className="hide">
                        <h2>{user.username}</h2>
                    </div>
                </div>
                <button onClick={() => handleLogout(user.id)}>Logout</button>
            </div>
        </div>
    );
}

export default NavBar;