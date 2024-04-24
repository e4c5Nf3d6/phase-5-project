import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { patchProductOrder, deleteProductOrder } from "../features/productOrders/productOrdersSlice";
import { updateActiveOrder, removeProductOrder } from "../features/orders/ordersSlice";

function EditProductOrder({ productOrder }) {

    const dispatch = useDispatch()
    const [productAmount, setProductAmount] = useState(productOrder.quantity)
    const [lastSavedAmount, setLastSavedAmount] = useState(productOrder.quantity)

    async function handleSave() {
        try {
            const data = await dispatch(patchProductOrder({
                id: productOrder.id,
                quantity: productAmount
            })).unwrap();
            dispatch(updateActiveOrder(data))
            setLastSavedAmount(data.quantity)
        } catch (err) {
            console.log(err)
        }
    }

    async function handleRemove() {
        try {
            const data = await dispatch(deleteProductOrder(productOrder.id)).unwrap();
            dispatch(removeProductOrder(data))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <p><strong>{productOrder.product.name}</strong></p>
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
            <button 
                className="remove"
                onClick={handleRemove}
            >
                X
            </button>                            
        </>
    );
}

export default EditProductOrder;