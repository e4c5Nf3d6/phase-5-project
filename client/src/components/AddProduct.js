import React, { useState } from "react";
import Select from "react-select";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCategories, addProduct } from "../features/products/productsSlice";

import BackArrow from "./BackArrow";

function AddProduct() {
    const [showError, setShowError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [product, setProduct] = useState(null)
    const categories = useSelector(selectAllCategories)

    const dispatch = useDispatch()

    const options = categories.map((category) => {
        if (category) {
            return({value: category.id, label: category.name})
        }
    })

    const formSchema = yup.object().shape({
        name: yup.string()
            .required("Please enter the product's name"),
        category_id: yup.number()
            .required("Please choose a category"),
        phorest_name: yup.string()
            .required("Please enter the product's name in Phorest"),
        vish_name: yup.string()
            .required("Please enter the product's name in Vish")
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            category_id: "",
            phorest_name: "",
            vish_name: ""
        },
        validateOnChange: false,
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                const data = await dispatch(addProduct(values)).unwrap();
                setProduct(data);
                setSuccess(true);
            } catch (err) {
                setShowError(true);
            }
        }
    });

    function handleSelect(option) {
        if (option === null) {
            formik.setFieldValue("category_id", "");   
        } else {
            formik.setFieldValue("category_id", option["value"]);
        }
    }

    return (
        <div className="add-container">
            <BackArrow />
            {success ? 
                <div className="success-message">
                    <h1>Product Added</h1>
                    <h2>{product.name}</h2>
                    <h3>{product.category.name}</h3>
                </div>
                :
                <div>
                    <h1>Add Product</h1>
                    <form onSubmit={formik.handleSubmit}>
                        {showError ? <p style={{ color: "red" }}>There is already a product by that name.</p> : null}
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            autoComplete="off"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label htmlFor="category_id">Category</label>
                        <Select 
                            name="category_id"
                            placeholder=""
                            isClearable
                            isSearchable
                            options={options}
                            onChange={handleSelect}
                        />
                        {formik.touched.category_id && formik.errors.category_id ? <p style={{ color: "red" }}>{formik.errors.category_id}</p> : null}
                        <label htmlFor="phorest_name">Phorest Name</label>
                        <input 
                            type="text"
                            name="phorest_name"
                            autoComplete="off"
                            value={formik.values.phorest_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.phorest_name && formik.errors.phorest_name ? <p style={{ color: "red" }}>{formik.errors.phorest_name}</p> : null}
                        <label htmlFor="vish_name">Vish Name</label>
                        <input
                            type="text"
                            name="vish_name"
                            autoComplete="off"
                            value={formik.values.vish_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.vish_name && formik.errors.vish_name ? <p style={{ color: "red" }}>{formik.errors.vish_name}</p> : null}
                        <button className="add-button" type="submit">Add Product</button>  
                    </form>
                </div>
            }          
        </div>
    )
}

export default AddProduct