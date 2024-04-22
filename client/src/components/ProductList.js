import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllProducts, setActiveProduct, selectActiveProduct, selectActiveCategory, selectProductQuery } from "../features/products/productsSlice";

function ProductList() {

    const dispatch = useDispatch()
    const products = useSelector(selectAllProducts)
    const activeProduct = useSelector(selectActiveProduct)
    const activeCategory = useSelector(selectActiveCategory)
    const productQuery = useSelector(selectProductQuery)

    const filteredProducts = products.filter((product) => {
        if (activeCategory === null) {
            return product.name.toLowerCase().includes(productQuery.toLowerCase())
        } else {
            return (product.category.name === activeCategory && product.name.toLowerCase().includes(productQuery.toLowerCase()))
        }
    })

    return (
        <div className="list">
            {filteredProducts.map(function(product) {
                return (
                    <p
                        className={product === activeProduct ? "active-option" : "clickable"}
                        key={product.id}
                        onClick={() => dispatch(setActiveProduct(product))}
                    >
                        {product.name}
                    </p>
                )
            })}
        </div>
    );
}

export default ProductList;