import React from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { selectCategoryOptions } from "../features/products/productsSlice";
import { setStartDate, setEndDate, setQuery, setCategory, setSortByAverage, selectStartDate, selectEndDate, selectQuery, selectSortByAverage } from "../features/productOrders/productOrdersSlice";

function TrackingFilter() {

    const dispatch = useDispatch();
    
    const options = useSelector(selectCategoryOptions);
    const startDate = useSelector(selectStartDate);
    const endDate = useSelector(selectEndDate);
    const query = useSelector(selectQuery);
    const sortByAverage = useSelector(selectSortByAverage);

    function handleChange(category) {
        if (category === null) {
            dispatch(setCategory(category));
        } else {
            dispatch(setCategory(category.value));
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
            <div className="toggle-box">
                <label htmlFor="checkbox">Show Averages</label>
                <label className="switch">
                    <input 
                        type="checkbox" 
                        name="checkbox"
                        checked={sortByAverage}
                        onChange={(e) => dispatch(setSortByAverage(e.target.checked))}
                    />
                    <span className="slider round"></span>
                </label>                
            </div>

        </div>
    );
}

export default TrackingFilter;