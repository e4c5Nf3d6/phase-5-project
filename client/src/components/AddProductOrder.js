import React from "react";
import Select from "react-select";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts } from "../features/products/productsSlice";
import { addProductOrder } from "../features/productOrders/productOrdersSlice";
import { addProductToOrder, selectActiveOrder } from "../features/orders/ordersSlice";
import { setOrderDisplay } from "../features/display/displaySlice";

function AddProductOrder() {
    
    const dispatch = useDispatch();

    const products = useSelector(selectAllProducts);
    const order = useSelector(selectActiveOrder);

    const currentProducts = order.product_orders.map((productOrder) => productOrder.product.name);

    const options = products.filter((product) => !currentProducts.includes(product.name)).map((product) => {
        if (product) {
            return({value: product.id, label: product.name});
        }
    });

    const formSchema = yup.object().shape({
        product_id: yup.number()
            .required("Please choose a product"),
        quantity: yup.number()
            .required("Please enter a quantity")
            .positive("Order quantity must be a positive number")
    });

    const formik = useFormik({
        initialValues: {
            order_id: order.id,
            product_id: "",
            quantity: 1
        },
        validateOnChange: false,
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                const data = await dispatch(addProductOrder(values)).unwrap();
                dispatch(addProductToOrder(data));
                dispatch(setOrderDisplay("edit"));
            } catch (err) {
                console.log(err);
            }
        }
    });

    function handleSelect(option) {
        if (option === null) {
            formik.setFieldValue("product_id", "");   
        } else {
            formik.setFieldValue("product_id", option["value"]);
        }
    }

    return (
        <div className="add-container">
            <h1>Add Product</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="product_id">Product</label>
                <Select 
                    name="product_id"
                    placeholder=""
                    isClearable
                    isSearchable
                    options={options}
                    onChange={handleSelect}
                />
                {formik.touched.product_id && formik.errors.product_id ? <p style={{ color: "red" }}>{formik.errors.product_id}</p> : null}
                <label htmlFor="quantity">Quantity</label>
                <br />
                <input 
                    type="number"
                    name="quantity"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.quantity && formik.errors.quantity ? <p style={{ color: "red" }}>{formik.errors.quantity}</p> : null}
                <br />
                <button className="add-button" type="submit">Add Product</button>  
            </form>
        </div>
    );
}

export default AddProductOrder;