import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Redirect } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/user/userSlice";

function Login() {
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user)

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
        onSubmit: async (values, { resetForm }) => {
            try {
                await dispatch(login(values)).unwrap();
            } catch (err) {
                setShowError(true);
                resetForm();
            }
        }
    });

    if (user.id) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <h1>Please Log In</h1>
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
                    autoComplete="off"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? <p style={{ color: "red" }}>{formik.errors.password}</p> : null}
                <button id="login-button" type="submit">Log In</button>
            </form>
        </div>
    );
}

export default Login;