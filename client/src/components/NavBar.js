import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../features/user/userSlice";
import { selectAllLocations, setActiveLocation } from "../features/locations/locationsSlice";

import { Link, FirstLink, LastLink } from "../styles/Links";

function NavBar() {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);
    const locations = useSelector(selectAllLocations);
    const activeLocation = useSelector((state) => state.locations.activeLocation);

    const handleLogout = async (id) => {
        await dispatch(logout(id)).unwrap();
    }
    
    return (
        <>
            {user.id ? 
                <div id="navbar">
                    <div id="nav-locations">
                        <button 
                            id="first-location" 
                            className={activeLocation === "all" ? "active-location" : "inactive-location"}
                            onClick={() => dispatch(setActiveLocation("all"))}
                        >
                            All Locations
                        </button>
                        {locations.map((location) => {
                            if (locations.findIndex((element) => element === location) === locations.length - 1) {
                                return (
                                    <button 
                                        key={location.id} 
                                        id="last-location"
                                        className={activeLocation === location.name ? "active-location" : "inactive-location"}
                                        onClick={() => dispatch(setActiveLocation(location.name))}
                                    >
                                        {location.name}
                                    </button>
                                );
                            } else return (
                                <button 
                                    key={location.id} 
                                    className={activeLocation === location.name ? "location active-location" : "location inactive-location"}
                                    onClick={() => dispatch(setActiveLocation(location.name))}
                                >
                                    {location.name}
                                </button>
                            );
                        })}
                    </div>
                    <div id="nav-main">
                        <h1>Color Order</h1>
                        <div id="nav-links">
                            <NavLink 
                                to="/" 
                                exact
                                style={FirstLink}
                                activeStyle={{
                                    background: "#5e7139",
                                    color: "white"
                                }}
                            >
                                Home
                            </NavLink>
                            <NavLink 
                                to="/products" 
                                style={Link}
                                activeStyle={{
                                    background: "#5e7139",
                                    color: "white"
                                }}
                            >
                                Products
                            </NavLink>
                            <NavLink 
                                to="/orders" 
                                style={Link}
                                activeStyle={{
                                    background: "#5e7139",
                                    color: "white"
                                }}
                            >
                                Orders
                            </NavLink>
                            <NavLink 
                                to="/tracking" 
                                style={LastLink}
                                activeStyle={{
                                    background: "#5e7139",
                                    color: "white"
                                }}
                            >
                                Tracking
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
                :
                null
            }
        </>
    );
}

export default NavBar;