import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { removeFloatingCategory, removeFloatingVishProducts } from "../features/orders/ordersSlice";
import { addCategory } from "../features/products/productsSlice";

function NewCategory() {

    const dispatch = useDispatch();

    const [showError, setShowError] = useState(false);

    const floatingCategories = useSelector((state) => state.orders.floatingCategories);

    let category;
    
    if (floatingCategories.length !== 0) {
        category = floatingCategories[0];
    }

    async function handleAdd() {
        try {
            await dispatch(addCategory({
                name: category
            })).unwrap();
            dispatch(removeFloatingCategory());
            setShowError(false);
        } catch (err) {
            setShowError(true);
        }
    }

    function handleSkip() {
        dispatch(removeFloatingVishProducts(category));
        dispatch(removeFloatingCategory());
        setShowError(false);
    }

    useEffect(() => {
        let timeout;
        if (showError) {
            timeout = setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
        return () => clearTimeout(timeout);
    }, [showError]);

    return (
        <div className="add">
            <h1>New Category Detected: {category}</h1>
            <h4>Would you like to add this category?</h4>
            <button className="add-button" onClick={handleAdd}>Yes</button>
            <button className="no-button" onClick={handleSkip}>No</button>
            {showError ? <h4 className="failure">Something went wrong. Please try again.</h4> : null}  
        </div>
    );
}

export default NewCategory;