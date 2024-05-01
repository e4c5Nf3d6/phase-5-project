import React, { useRef } from "react";
import jsPDF from "jspdf";

function OrderPDF({ order }) {

    const sortedProductOrders = order.product_orders.toSorted((a, b) => {
        if (a.product.category.name < b.product.category.name) {
            return -1;
        } else return 1;
    })

    function downloadPDF() {
        var elementHTML = document.querySelector("#pdf");
        const pdf = new jsPDF("p", "mm", "a4", true);
        pdf.html(elementHTML, {
            margin: [15, 15, 18, 15], 
            callback: function(pdf) {
                pdf.save('color-order.pdf');
            },
            width: 180,
            windowWidth: 699
        });
    }

    return (
        <div>
            <button className="add-button" onClick={downloadPDF}>Download</button>
            <div id="pdf">
                <h1>Terramé {order.location.name} Order</h1>
                <h2>{order.date.split(" ")[0]}</h2>
                <table>
                    <tr>
                        <th>Category</th>
                        <th>Product</th>
                        <th>Quantity</th>
                    </tr>
                    {sortedProductOrders.map((productOrder) => {
                        return (
                            <tr>
                                <td>{productOrder.product.category.name}</td>
                                <td>{productOrder.product.name}</td>
                                <td>{productOrder.quantity}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    );
}

export default OrderPDF;
