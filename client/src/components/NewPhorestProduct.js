import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select"
import CreatableSelect from 'react-select/creatable';
import { useDispatch, useSelector } from "react-redux";

import { selectAllCategories } from "../features/products/productsSlice";
import { removeFloatingProduct, removeFloatingVishProduct } from "../features/orders/ordersSlice";
import { addProduct } from "../features/products/productsSlice";
import { addProductOrder } from "../features/productOrders/productOrdersSlice";

function NewPhorestProduct({ orderID }) {

    const dispatch = useDispatch();

    const vishRef = useRef(null);

    const [vishProduct, setVishProduct] = useState(null);

    const categories = useSelector(selectAllCategories);
    const floatingPhorestProducts = useSelector((state) => state.orders.floatingProducts.phorest);
    const floatingVishProducts = useSelector((state) => state.orders.floatingProducts.vish);
    const categoryRef = useRef(null);

    let product;
    
    if (floatingPhorestProducts.length !== 0) {
        product = floatingPhorestProducts[0];
    }

    const vishOptions = floatingVishProducts.map((product) => {
        if (product) {
            return ({value: product, label: `${product[0]} (${product[2]})`});
        }
    });

    const categoryOptions = categories.map((category) => {
        if (category) {
            return ({value: category.id, label: category.name});
        }
    });

    const formSchema = yup.object().shape({
        name: yup.string()
            .required("Please enter the product's name"),
        category_id: yup.number()
            .required("Please choose a category"),
        vish_name: yup.string()
            .required("Please enter the product's name in Vish"),
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
                dispatch(removeFloatingProduct("phorest"));
                dispatch(removeFloatingVishProduct(vishProduct));
            } catch (err) {
                console.log(err);
            }
        }
    });

    useEffect(() => {
        formik.setFieldValue("name", product[0]);
        formik.setFieldValue("vish_name", "");
        formik.setFieldValue("phorest_name", product[0]);
        formik.setFieldValue("category_id", "");
        formik.setFieldValue("quantity", product[1]);
        categoryRef.current.clearValue();
        vishRef.current.clearValue();
    }, [product]);

    function handleCategorySelect(option) {
        if (option === null) {
            formik.setFieldValue("category_id", "");   
        } else {
            formik.setFieldValue("category_id", option["value"]);
        }
    }

    function handleVishSelect(option) {
        if (option === null) {
            formik.setFieldValue("vish_name", "");   
            setVishProduct(null);
        } else {
            try {
                formik.setFieldValue("vish_name", option["value"][0]);
                setVishProduct(option['value'][0]);
                if (option["value"][1] > formik.values.quantity) {
                    formik.setFieldValue("quantity", option['value'][1]);
                }
            } catch (err) {
                formik.setFieldValue("vish_name", option["value"]);
            }
        }        
    }

    function handleSkip() {
        dispatch(removeFloatingProduct("phorest"));
    }

    return (
        <div className="add-container">
            <h1>New Phorest Product: {product[0]}</h1>
            <form onSubmit={formik.handleSubmit}>
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
                    options={categoryOptions}
                    onChange={handleCategorySelect}
                    ref={categoryRef}
                />
                {formik.touched.category_id && formik.errors.category_id ? <p style={{ color: "red" }}>{formik.errors.category_id}</p> : null}
                <label htmlFor="vish_name">Vish Name</label>
                <CreatableSelect 
                    name="vish_name"
                    placeholder=""
                    isClearable 
                    isSearchable
                    options={vishOptions} 
                    onChange={handleVishSelect}
                    ref={vishRef}
                />;
                {formik.touched.vish_name && formik.errors.vish_name ? <p style={{ color: "red" }}>{formik.errors.vish_name}</p> : null}
                <button className="add-button" type="submit">Add Product</button>  
            </form> 
            <button className="skip" onClick={handleSkip}><h1>➔</h1></button> 
        </div>
    );
}

export default NewPhorestProduct;