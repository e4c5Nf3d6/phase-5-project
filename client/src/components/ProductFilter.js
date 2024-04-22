import React, { useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductCategories, selectAllCategories, selectProductQuery, setActiveCategory, setQuery } from "../features/products/productsSlice";


function ProductFilter() {

    const dispatch = useDispatch()
    const categories = useSelector(selectAllCategories)
    const productQuery = useSelector(selectProductQuery)

    const options = categories.map((category) => {
        if (category) {
            return({value: category.name, label: category.name})
        }
    })

    function handleChange(category) {
        if (category === null) {
            dispatch(setActiveCategory(category))
        } else {
            dispatch(setActiveCategory(category.value))
        }
    }

    return(
        <div className="filter">
            <input
                type="text"
                id="product-query"
                name="product-query"
                placeholder="Search for a product"
                value={productQuery}
                onChange={(e) => dispatch(setQuery(e.target.value))}
            />
            <Select 
                name="categories"
                placeholder="Filter by category"
                isClearable
                isSearchable
                options={options}
                onChange={handleChange}
            />
        </div>
    );
}

export default ProductFilter;