import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Home from "./Home";
import Login from "./Login";
import NavBar from "./NavBar";
import Orders from "./Orders";
import PrivateRoute from "./PrivateRoute";
import Products from "./Products";
import Tracking from "./Tracking";

import { checkSession } from "../features/user/userSlice";
import { fetchProducts, fetchProductCategories } from "../features/products/productsSlice";
import { fetchProductOrders } from "../features/productOrders/productOrdersSlice";
import { fetchLocations } from "../features/locations/locationsSlice";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkSession());
        dispatch(fetchProductCategories());
        dispatch(fetchProductOrders());
        dispatch(fetchProducts());
        dispatch(fetchLocations());
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