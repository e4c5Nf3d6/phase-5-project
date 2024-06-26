import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";

import BackArrow from "./BackArrow";
import NewPhorestProduct from "./NewPhorestProduct";
import NewVishProduct from "./NewVishProduct";
import NewCategory from "./NewCategory";

import { selectUserID } from "../features/user/userSlice";
import { selectAllLocations } from "../features/locations/locationsSlice";
import { createOrder, setActiveOrder, getOrder, selectFloatingCategories, selectFloatingProducts } from "../features/orders/ordersSlice";
import { setCreateOrderDisplay, selectCreateOrderDisplay } from "../features/display/displaySlice";

function CreateOrder() {

    const history = useHistory();
    const dispatch = useDispatch();

    const [orderID, setOrderID] = useState(null);
    const [error, setError] = useState(null);
    const [phorestPath, setPhorestPath] = useState(null);
    const [vishPath, setVishPath] = useState(null);

    const userID = useSelector(selectUserID);
    const locations = useSelector(selectAllLocations);
    const newPhorestProducts = useSelector(selectFloatingProducts).phorest;
    const newVishProducts = useSelector(selectFloatingProducts).vish;
    const newCategories = useSelector(selectFloatingCategories);
    const success = useSelector(selectCreateOrderDisplay);
  
    const phorest = useRef(null);
    const vish = useRef(null);

    const options = locations.map((location) => {
        if (location) {
            return ({value: location.id, label: location.name});
        }
    });

    const formSchema = yup.object().shape({
        location_id: yup.number()
            .required("Please choose a location"),
    });

    const formik = useFormik({
        initialValues: {
            location_id: "",
            phorestPath: null,
            vishPath: null,
            user_id: userID
        },
        validateOnChange: false,
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                const data = await dispatch(createOrder(values)).unwrap();
                setOrderID(data.order.id);
                dispatch(setActiveOrder(data.order));
                dispatch(setCreateOrderDisplay("success"));
            } catch (err) {
                setError(err.message);
            }
        }
    });

    function handleChange(e, pathFunction, field) {
        if (e.target.files[0] === undefined) {
            pathFunction(null);
            formik.setFieldValue(field, null);
        } else {
            pathFunction(e.target.files[0].name.split("\\").slice(-1));
            formik.setFieldValue(field, e.target.files[0]);
        }
    }

    function handleSelect(option) {
        if (option === null) {
            formik.setFieldValue("location_id", "");   
        } else {
            formik.setFieldValue("location_id", option["value"]);
        }    
    }

    async function handleView() {
        const order = await dispatch(getOrder(orderID)).unwrap();
        dispatch(setActiveOrder(order));
        history.push("/orders");
    }

    if (newCategories.length !== 0) {
        return (
            <NewCategory />
        );
    }

    if (newPhorestProducts.length !== 0) {
        return (
            <NewPhorestProduct orderID={orderID} />
        );
    }

    if (newVishProducts.length !== 0) {
        return (
            <NewVishProduct orderID={orderID} />
        );
    }

    return (
        <div className="add-container">
            <BackArrow />
            {success === "success" ? 
                <div className="success-message">
                    <h1>Order Created</h1>
                    <button className="view-button" onClick={handleView}>View Order</button>
                </div>
                :
                <div>
                    <h1>Create Order</h1>
                    {error ? <p style={{ color: "red" }}>{error}</p> : null}
                    <div className="buttons">
                        <div>
                            <button 
                                name="phorest-report"
                                onClick={() => phorest.current.click()}
                            >
                                Upload Phorest Report
                            </button>
                            <abbr>
                                ?
                                <span>
                                    This can be found in Phorest.
                                    <br /><br />
                                    <strong>Manager → Reports → Additional Reports → Products → Product Usage</strong>
                                    <br /><br />
                                    Set the date range to the previous week and click <strong>Generate Now</strong>.
                                    <br /><br />
                                    Save as an Excel file.
                                    <img src="phorest_report_screenshot.png" className="tooltip-img" alt="Phorest Report Screenshot" />
                                </span>
                            </abbr>
                        </div>
                        { phorestPath ? <p>{phorestPath}</p> : null }
                        <div>
                            <button 
                                name="vish-report"
                                onClick={() => vish.current.click()}
                            >
                                Upload Vish Report
                            </button>
                            <abbr>
                                ?
                                <span>
                                    This can be found in Vish.
                                    <br /><br />
                                    <strong>Product Report → Wella</strong>
                                    <br /><br />
                                    Set the date range to the previous week and scroll down to <strong>Top Products</strong>.
                                    <br /><br />
                                    Click the download button.
                                    <img src="vish_report_screenshot.png" className="tooltip-img" alt="Vish Report Screenshot" />
                                </span>
                            </abbr>
                        </div>
                        { vishPath ? <p>{vishPath}</p> : null }
                    </div>
                    <form className="form" onSubmit={formik.handleSubmit}>
                        <input 
                            id="phorest"
                            type="file" 
                            ref={phorest}
                            accept=".xls, .xlsx"
                            onChange={(e) => handleChange(e, setPhorestPath, "phorestPath")}
                        />
                        <input 
                            id="vish"
                            type="file" 
                            ref={vish}
                            accept=".xls, .xlsx"
                            onChange={(e) => handleChange(e, setVishPath, "vishPath")}
                        />
                        <label htmlFor="location">Choose a Location</label>
                        <Select 
                            name="location"
                            placeholder=""
                            isClearable
                            isSearchable
                            options={options}
                            onChange={handleSelect}
                        />
                        {formik.touched.location_id && formik.errors.location_id ? <p style={{ color: "red" }}>{formik.errors.location_id}</p> : null}
                        <button className="add-button" type="submit">Create Order</button>  
                    </form>
                </div>
            }
        </div>
    );
}

export default CreateOrder;