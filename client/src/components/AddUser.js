import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import BackArrow from "./BackArrow";

import { addUser } from "../features/users/usersSlice";

function AddUser() {

    const dispatch = useDispatch();

    const [showError, setShowError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState(null);

    const formSchema = yup.object().shape({
        username: yup.string()
            .required("Please enter a username"),
        password: yup.string()
            .required("Please enter a password"),
        password_confirmation: yup.string()
            .required("Please confirm password")
            .oneOf([yup.ref('password'), null], 'Passwords must match')
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            password_confirmation: "",
            admin: false
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                const data = await dispatch(addUser(values)).unwrap();
                setUser(data);
                setSuccess(true);
            } catch (err) {
                setShowError(true);
            }
        }
    });

    return (
        <div className="add-container">
            <BackArrow />
            {success ? 
                <div className="success-message">
                    <h1>User Added</h1>
                    <h2 className="new">{user.username}</h2>
                    <h3 className="new">{user.admin ? "Administrator" : "Basic Access"}</h3>
                </div>
                :
                <div>
                    <h1>Add User</h1>
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
                        <label htmlFor="password_confirmation">Password Confirmation</label>
                        <input 
                            type="password"
                            name="password_confirmation"
                            autoComplete="off"
                            value={formik.values.password_confirmation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password_confirmation && formik.errors.password_confirmation ? <p style={{ color: "red" }}>{formik.errors.password_confirmation}</p> : null}
                        <label htmlFor="admin">Admin</label>
                        <input
                            type="checkbox"
                            name="admin"
                            value={formik.values.admin}
                            onChange={() => formik.setFieldValue("admin", !formik.values.admin)}
                        />
                        <br/>
                        <button className="add-button" type="submit">Add User</button>  
                    </form>
                </div>
            }          
        </div>
    );
}

export default AddUser;