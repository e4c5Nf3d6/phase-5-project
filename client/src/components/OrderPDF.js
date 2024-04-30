import React, { useRef } from "react";
import jsPDF from "jspdf";

function OrderPDF({ order }) {

    const pdfRef = useRef(null);

    console.log(order)

    function downloadPDF() {
        var elementHTML = document.querySelector("#pdf");
        const pdf = new jsPDF("p", "mm", "a4", true);
        pdf.html(elementHTML, {
            margin: [15, 15, 15, 15], 
            callback: function(pdf) {
                pdf.save('sample-document.pdf');
            },
            width: 180, //target width in the PDF document
            windowWidth: 650 //window width in CSS pixels
        });
    }

    return (
        <div>
            <div id="pdf" ref={pdfRef}>
                <h2>Terramé {order.location.name} Order</h2>
                <h3>{order.date.split(" ")[0]}</h3>
                <table>
                    <tr>
                        <th>Category</th>
                        <th>Product</th>
                        <th>Quantity</th>
                    </tr>
                    {order.product_orders.map((productOrder) => {
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
            <button className="add-button" onClick={downloadPDF}>Download</button>
        </div>
    );
}

export default OrderPDF;
