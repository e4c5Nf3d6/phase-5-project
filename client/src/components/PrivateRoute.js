import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute ({ path, component }) {
  
    const user = useSelector((state) => state.user);

    if (!user.username) {
        return (
            <Redirect to="/login" />
        );
    }
    
    return (
        <Route path={path} component={component} />
    );
}

export default PrivateRoute;