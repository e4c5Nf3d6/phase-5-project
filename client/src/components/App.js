import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./Login";

function App() {
  return (
    <main>
        <Switch>
            <Route path="/login">
                <Login />
            </Route>
        </Switch>
    </main>
  );
}

export default App;