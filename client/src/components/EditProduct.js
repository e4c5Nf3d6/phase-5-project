import React, { useState } from "react";
import Select from "react-select";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { editProduct, selectCategoryOptions } from "../features/products/productsSlice";
import { setProductDisplay } from "../features/display/displaySlice";
import { selectActiveProduct, setActiveProduct } from "../features/products/productsSlice";

function EditProduct() {

    const dispatch = useDispatch();

    const [showError, setShowError] = useState(false);

    const options = useSelector(selectCategoryOptions);
    const product = useSelector(selectActiveProduct);

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
            id: product.id,
            name: product.name,
            category_id: product.category.id,
            phorest_name: product.phorest_name,
            vish_name: product.vish_name
        },
        validateOnChange: false,
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                const data = await dispatch(editProduct(values)).unwrap();
                dispatch(setProductDisplay("details"));
                dispatch(setActiveProduct(data));
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
        <div className="edit-container">
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
                <abbr>
                    ?
                    <span>
                        This can be found in Vish.
                        <br />
                        <strong>Products → Wella</strong>
                        <img src="category_screenshot.png" className="tooltip-img" alt="Category Screenshot" />
                    </span>
                </abbr>
                <Select 
                    name="category_id"
                    placeholder=""
                    isClearable
                    isSearchable
                    defaultValue={{value: product.category.id, label: product.category.name}}
                    options={options}
                    onChange={handleSelect}
                />
                {formik.touched.category_id && formik.errors.category_id ? <p style={{ color: "red" }}>{formik.errors.category_id}</p> : null}
                <label htmlFor="phorest_name">Phorest Name</label>
                <abbr>
                    ?
                    <span>
                        This can be found in Phorest.
                        <br />
                        <strong>Manager → Inventory</strong>
                        <br />
                        Double click on the product name.
                        <img src="phorest_screenshot.png" className="tooltip-img" alt="Phorest Screenshot" />
                        Make sure to copy and paste!
                    </span>
                </abbr>
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
                <abbr>
                    ?
                    <span>
                        This can be found in Vish.
                        <br />
                        <strong>Products → Wella</strong>
                        <br />
                        Click on the product name.
                        <img src="vish_screenshot.png" className="tooltip-img" alt="Vish Screenshot" />
                        Make sure to copy and paste!
                    </span>
                </abbr>
                <input
                    type="text"
                    name="vish_name"
                    autoComplete="off"
                    value={formik.values.vish_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.vish_name && formik.errors.vish_name ? <p style={{ color: "red" }}>{formik.errors.vish_name}</p> : null}
                <button className="add-button" type="submit">Save</button>  
            </form>
        </div>
    );
}

export default EditProduct;