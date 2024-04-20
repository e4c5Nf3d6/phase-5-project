import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addUser } from "../features/users/usersSlice";

import BackArrow from "./BackArrow";

function AddUser() {
    const [showError, setShowError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()

    const formSchema = yup.object().shape({
        username: yup.string()
            .required("Please enter a username"),
        password: yup.string()
            .required("Please enter a password")
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
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
                    <h2>{user.username}</h2>
                    <h3>{user.admin ? "Administrator" : "Basic Access"}</h3>
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
    )
}

export default AddUser