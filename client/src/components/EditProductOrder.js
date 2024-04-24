import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { patchProductOrder } from "../features/productOrders/productOrdersSlice";
import { updateActiveOrder } from "../features/orders/ordersSlice";

function EditProductOrder({ product_order }) {

    const dispatch = useDispatch()
    const [productAmount, setProductAmount] = useState(product_order.quantity)
    const [lastSavedAmount, setLastSavedAmount] = useState(product_order.quantity)

    async function handleSave() {
        try {
            const data = await dispatch(patchProductOrder({
                id: product_order.id,
                quantity: productAmount
            })).unwrap();
            dispatch(updateActiveOrder(data))
            setLastSavedAmount(data.quantity)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <p><strong>{product_order.product.name}</strong></p>
            <input
                type="number"
                value={productAmount}
                onChange={(e) => setProductAmount(parseInt(e.target.value))}
            />
            <button 
                className={lastSavedAmount === productAmount ? "disabled" : "not-disabled"}
                onClick={handleSave}
                disabled={lastSavedAmount === productAmount}
            >
                Save
            </button>                          
        </>
    );
}

export default EditProductOrder;