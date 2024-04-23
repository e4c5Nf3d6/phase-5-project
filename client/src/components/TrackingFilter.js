import React from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCategories } from "../features/products/productsSlice";
import { setStartDate, setEndDate, setQuery, setCategory } from "../features/productOrders/productOrdersSlice";

function TrackingFilter() {

    const startDate = useSelector((state) => state.productOrders.startDate)
    const endDate = useSelector((state) => state.productOrders.endDate)
    const query = useSelector((state) => state.productOrders.query)
    const dispatch = useDispatch()
    const categories = useSelector(selectAllCategories)

    const options = categories.map((category) => {
        if (category) {
            return({value: category.name, label: category.name})
        }
    })

    function handleChange(category) {
        if (category === null) {
            dispatch(setCategory(category))
        } else {
            dispatch(setCategory(category.value))
        }
    }

    return(
        <div className="filter">
            <div className="date">
                <label htmlFor="start-date">Start Date</label>
                <input 
                    name="start-date"
                    type="date" 
                    value={startDate} 
                    onChange={(e) => dispatch(setStartDate(e.target.value))}
                />
            </div>
            <div className="date">
                <label htmlFor="end-date">End Date</label>
                <input 
                    name="end-date"
                    type="date" 
                    value={endDate} 
                    onChange={(e) => dispatch(setEndDate(e.target.value))}
                />              
            </div>
            <input
                type="text"
                id="product-query"
                name="product-query"
                placeholder="Search for a product"
                value={query}
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

export default TrackingFilter;