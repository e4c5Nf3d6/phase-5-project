import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select"
import { useDispatch, useSelector } from "react-redux";
import { selectAllCategories } from "../features/products/productsSlice";
import { removeFloatingProduct } from "../features/orders/ordersSlice";
import { addProduct } from "../features/products/productsSlice";
import { addProductOrder } from "../features/productOrders/productOrdersSlice";

function NewPhorestProduct({ orderID }) {

    const categories = useSelector(selectAllCategories)
    const product = useSelector((state) => state.orders.floatingProducts.phorest[0])
    const floatingVishProducts = useSelector((state) => state.orders.floatingProducts.vish)
    const selectRef = useRef(null)

    const dispatch = useDispatch()

    const categoryOptions = categories.map((category) => {
        if (category) {
            return({value: category.id, label: category.name})
        }
    })

    const formSchema = yup.object().shape({
        name: yup.string()
            .required("Please enter the product's name"),
        category_id: yup.number()
            .required("Please choose a category"),
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
                await dispatch(addProductOrder({
                    "product_id": data.id,
                    "order_id": orderID,
                    "quantity": product[1]
                })).unwrap();
                dispatch(removeFloatingProduct("phorest"))
            } catch (err) {
                console.log(err);
            }
        }
    });

    useEffect(() => {
        formik.setFieldValue("name", product[0])
        formik.setFieldValue("vish_name", "")
        formik.setFieldValue("phorest_name", product[0])
        formik.setFieldValue("category_id", "")
        selectRef.current.clearValue()
    }, [product])

    function handleSelect(option) {
        if (option === null) {
            formik.setFieldValue("category_id", "");   
        } else {
            formik.setFieldValue("category_id", option["value"]);
        }
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
                    onChange={handleSelect}
                    ref={selectRef}
                />
                {formik.touched.category_id && formik.errors.category_id ? <p style={{ color: "red" }}>{formik.errors.category_id}</p> : null}
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
    );
}

export default NewPhorestProduct;