import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";

import Home from "./Home";
import Login from "./Login";
import NavBar from "./NavBar";
import Orders from "./Orders";
import PrivateRoute from "./PrivateRoute";
import Products from "./Products";
import Tracking from "./Tracking";

import { fetchProductCategories } from "../features/products/productsSlice";
import { fetchProductOrders } from "../features/productOrders/productOrdersSlice";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        fetch("/check_session")
        .then((r) => {
            if (r.ok) {
                r.json()
                .then((user) => dispatch(setUser(user)));
            }
        });
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchProductCategories())
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchProductOrders())
    }, [dispatch])

    return (
        <main>
            <NavBar />
            <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute path="/products" component={Products} />
                <PrivateRoute path="/orders" component={Orders} />
                <PrivateRoute path="/tracking" component={Tracking} />
                <PrivateRoute path="/" component={Home} />
            </Switch>
        </main>
    );
}

export default App;