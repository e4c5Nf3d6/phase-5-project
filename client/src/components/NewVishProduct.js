import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { selectAllCategories } from "../features/products/productsSlice";
import { removeFloatingProduct } from "../features/orders/ordersSlice";
import { addProduct } from "../features/products/productsSlice";
import { addProductOrder } from "../features/productOrders/productOrdersSlice";

function NewVishProduct({ orderID }) {

    const dispatch = useDispatch();

    const [showError, setShowError] = useState(false);

    const categories = useSelector(selectAllCategories);
    const floatingVishProducts = useSelector((state) => state.orders.floatingProducts.vish);

    let product;
    
    if (floatingVishProducts.length !== 0) {
        product = floatingVishProducts[0];
    }

    const formSchema = yup.object().shape({
        name: yup.string()
            .required("Please enter the product's name"),
        phorest_name: yup.string()
            .required("Please enter the product's name in Phorest"),
        quantity: yup.number()
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            category_id: "",
            phorest_name: "",
            vish_name: "",
            quantity: 0
        },
        validateOnChange: false,
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                const data = await dispatch(addProduct(values)).unwrap();
                await dispatch(addProductOrder({
                    "product_id": data.id,
                    "order_id": orderID,
                    "quantity": product[1]
                })).unwrap();
                dispatch(removeFloatingProduct("vish"));
                setShowError(false);
            } catch (err) {
                setShowError(true);
            }
        }
    });

    useEffect(() => {
        formik.setFieldValue("name", product[0]);
        formik.setFieldValue("phorest_name", "");
        formik.setFieldValue("vish_name", product[0]);
        for (const category of categories) {
            if (category.name === product[2]) {
                formik.setFieldValue("category_id", category.id);
            }
        }
        formik.setFieldValue("quantity", product[1]);
        formik.setFieldTouched('name', false, false);
        formik.setFieldTouched('phorest_name', false, false);
    }, [product]);

    function handleSkip() {
        dispatch(removeFloatingProduct("vish"));
    }

    return (
        <div className="add-container">
            <div>
                <h1>New Vish Product: {product[0]}</h1>
                <h3>Category: {product[2]}</h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
                {showError ? <p style={{ color: "red" }}>This product already exists.</p> : null}
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    autoComplete="off"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
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
                <button className="add-button" type="submit">Add Product</button>  
            </form> 
            <button className="skip" onClick={handleSkip}><h1>➔</h1></button> 
        </div>
    );
}

export default NewVishProduct;