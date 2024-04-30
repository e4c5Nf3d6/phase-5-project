import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select";

import BackArrow from "./BackArrow";
import NewPhorestProduct from "./NewPhorestProduct";
import NewVishProduct from "./NewVishProduct";

import { useSelector, useDispatch } from "react-redux";
import { selectAllLocations } from "../features/locations/locationsSlice";
import { createOrder, setActiveOrder } from "../features/orders/ordersSlice";
import { setCreateOrderDisplay } from "../features/display/displaySlice";

function CreateOrder() {

    const history = useHistory();

    const dispatch = useDispatch();

    const [orderID, setOrderID] = useState(null);

    const userID = useSelector((state) => state.user.id);
    const locations = useSelector(selectAllLocations);
    const newPhorestProducts = useSelector((state) => state.orders.floatingProducts.phorest);
    const newVishProducts = useSelector((state) => state.orders.floatingProducts.vish);
    const success = useSelector((state => state.display.createOrder));

    const options = locations.map((location) => {
        if (location) {
            return ({value: location.id, label: location.name});
        }
    });

    const [phorestPath, setPhorestPath] = useState(null);
    const [vishPath, setVishPath] = useState(null);

    const phorest = useRef(null);
    const vish = useRef(null);

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
                dispatch(setCreateOrderDisplay("success"));
                dispatch(setActiveOrder(data.order));
            } catch (err) {
                console.log(err);
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

    function handleView() {
        history.push("/orders");
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

    return(
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
                    <div className="buttons">
                        <button 
                            name="phorest-report"
                            onClick={() => phorest.current.click()}
                        >
                            Upload Phorest Report
                        </button>
                        { phorestPath ? <p>{phorestPath}</p> : null }
                        <button 
                            name="vish-report"
                            onClick={() => vish.current.click()}
                        >
                            Upload Vish Report
                        </button>
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