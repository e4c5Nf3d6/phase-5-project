import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { setProductDisplay } from "../features/display/displaySlice";
import { selectAllProducts, setActiveProduct, selectActiveProduct, selectActiveCategory, selectProductQuery } from "../features/products/productsSlice";

function ProductList() {

    const dispatch = useDispatch();

    const products = useSelector(selectAllProducts);
    const activeProduct = useSelector(selectActiveProduct);
    const activeCategory = useSelector(selectActiveCategory);
    const productQuery = useSelector(selectProductQuery);

    
    const sortedProducts = products.toSorted((a, b) => {
        if (a.name < b.name) {
            return -1;
        } else return 1;
    }).toSorted((a, b) => {
        if (a.category.name < b.category.name) {
            return -1;
        } else return 1;
    });

    console.log(sortedProducts)

    const filteredProducts = sortedProducts.filter((product) => {
        if (activeCategory === null) {
            return product.name.toLowerCase().includes(productQuery.toLowerCase());
        } else {
            return (product.category.name === activeCategory && product.name.toLowerCase().includes(productQuery.toLowerCase()));
        }
    });

    return (
        <div className="list">
            {filteredProducts.map(function(product) {
                if (activeProduct) {
                    if (activeProduct.id === product.id) {
                        return (
                            <p
                                className={"active-option"}
                                key={product.id}
                                onClick={() => {
                                    dispatch(setProductDisplay("details"))
                                    dispatch(setActiveProduct(product))
                                }}
                            >
                                {product.name}
                            </p>
                        );
                    }
                }
                return (
                    <p
                        className={product === activeProduct ? "active-option" : "clickable"}
                        key={product.id}
                        onClick={() => {
                            dispatch(setProductDisplay("details"));
                            dispatch(setActiveProduct(product));
                        }}
                    >
                        {product.name}
                    </p>
                )
            })}
        </div>
    );
}

export default ProductList;