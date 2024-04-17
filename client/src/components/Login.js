import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";

function Login() {
    const [showError, setShowError] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const formSchema = yup.object().shape({
        username: yup.string()
            .required("Please enter your username"),
        password: yup.string()
            .required("Please enter your password")
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values, null, 2)
            }).then((r) => {
                if (r.status === 200) {
                    r.json()
                    .then((user) => dispatch(setUser(user)))
                } else if (r.status === 401) {
                    setShowError(true)
                }
            });
        }
    });

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={formik.handleSubmit}>
                {showError ? <p style={{ color: "red" }}>Invalid username or password</p> : null}
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    autoComplete="off"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? <p style={{ color: "red" }}>{formik.errors.username}</p> : null}
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? <p style={{ color: "red" }}>{formik.errors.password}</p> : null}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;