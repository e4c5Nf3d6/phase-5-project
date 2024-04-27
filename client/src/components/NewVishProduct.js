import React, { useEffect, useRef, useState } from "react";
import { Formik, FormikContext, useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select"
import CreatableSelect from 'react-select/creatable';
import { useDispatch, useSelector } from "react-redux";
import { selectAllCategories } from "../features/products/productsSlice";
import { removeFloatingProduct } from "../features/orders/ordersSlice";
import { addProduct } from "../features/products/productsSlice";
import { addProductOrder } from "../features/productOrders/productOrdersSlice";

function NewVishProduct({ orderID }) {

    const categories = useSelector(selectAllCategories)
    const floatingVishProducts = useSelector((state) => state.orders.floatingProducts.vish)
    const categoryRef = useRef(null)
    const [category, setCategory] = useState({value: "", label: ""})

    let product
    
    if (floatingVishProducts.length !== 0) {
        product = floatingVishProducts[0]
    }

    const dispatch = useDispatch()

    const categoryOptions = categories.map((category) => {
        if (category) {
            return ({value: category.id, label: category.name})
        }
    })

    const formSchema = yup.object().shape({
        name: yup.string()
            .required("Please enter the product's name"),
        phorest_name: yup.string()
            .required("Please enter the product's name in Phorest"),
        category_id: yup.number()
            .required("Please choose a category"),
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
                dispatch(removeFloatingProduct("vish"))
            } catch (err) {
                console.log(err);
            }
        }
    });

    useEffect(() => {
        formik.setFieldValue("name", product[0])
        formik.setFieldValue("phorest_name", "")
        formik.setFieldValue("vish_name", product[0])
        for (let i = 0; i < categoryOptions.length; i++) {
            if (product[2] === categoryOptions[i].label) {
                console.log(true)
                formik.setFieldValue("category_id", categoryOptions[i].value)
                setCategory(categoryOptions[i])
            } else {
                formik.setFieldValue("category_id", "")
                categoryRef.current.clearValue()
            }
        }
        formik.setFieldValue("quantity", product[1])
    }, [product])

    function handleCategorySelect(option) {
        if (option === null) {
            formik.setFieldValue("category_id", "");   
        } else {
            formik.setFieldValue("category_id", option["value"]);
        }
    }

    function handleSkip() {
        dispatch(removeFloatingProduct("vish"))
    }

    return (
        <div className="add-container">
            <div>
                <h1>New Vish Product: {product[0]}</h1>
                <h3>{product[2]}</h3>
            </div>
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
                    isClearable
                    isSearchable
                    value={category}
                    options={categoryOptions}
                    onChange={handleCategorySelect}
                    ref={categoryRef}
                    
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
                <button className="add-button" type="submit">Add Product</button>  
            </form> 
            <button className="skip" onClick={handleSkip}>➔</button> 
        </div>
    );
}

export default NewVishProduct;