import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";

import Home from "./Home";
import Login from "./Login";
import NavBar from "./NavBar";
import PrivateRoute from "./PrivateRoute";

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
    }, []);

    return (
        <main>
            <NavBar />
            <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute path="/" component={Home} />
            </Switch>
        </main>
    );
}

export default App;