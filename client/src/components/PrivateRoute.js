import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./Login";

function PrivateRoute ({ path, component }) {
  
    const user = useSelector((state) => state.user);
    
    return (
        <> {user.id ? <Route path={path} component={component} /> : <Login />} </>
    );
}

export default PrivateRoute;