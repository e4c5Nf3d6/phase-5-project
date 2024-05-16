import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

import BackArrow from "./BackArrow";

import { addLocation } from "../features/locations/locationsSlice";

function AddLocation() {

    const dispatch = useDispatch();

    const [showError, setShowError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [location, setLocation] = useState(null);

    const formSchema = yup.object().shape({
        name: yup.string()
            .required("Please enter the location's name")
    });

    const formik = useFormik({
        initialValues: {
            name: ""
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                const data = await dispatch(addLocation(values)).unwrap();
                setLocation(data);
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
                    <h1>Location Added</h1>
                    <h2 className="new">{location.name}</h2>
                </div>
                :
                <div>
                    <h1>Add Location</h1>
                    <form onSubmit={formik.handleSubmit}>
                        {showError ? <p style={{ color: "red" }}>There is already a location by that name.</p> : null}
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            autoComplete="off"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name ? <p style={{ color: "red" }}>{formik.errors.name}</p> : null}
                        <button className="add-button" type="submit">Add Location</button>  
                    </form>
                </div>
            }          
        </div>
    );
}

export default AddLocation;