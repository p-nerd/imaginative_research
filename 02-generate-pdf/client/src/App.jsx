import axios from "axios";
import { useState } from "react";

function App() {
    const [name, setName] = useState("");
    const [receiptId, setReceiptId] = useState(0);
    const [price1, setPrice1] = useState(0);
    const [price2, setPrice2] = useState(0);

    const createAndDownloadPDF = async () => {
        await axios.post("http://localhost:5000/create-pdf", {
            name,
            receiptId,
            price1,
            price2,
        });
        const result = await axios.get("http://localhost:5000/fetch-pdf", {
            responseType: "blob",
        });
        const pdfBlob = new Blob([result.data], { type: "application/pdf" });

        const url = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "my-pdf-document.pdf";
        link.click();
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Receipt ID"
                name="receiptId"
                value={receiptId}
                onChange={e => setReceiptId(e.target.value)}
            />
            <input
                type="number"
                placeholder="Price 1"
                name="price1"
                value={price1}
                onChange={e => setPrice1(e.target.value)}
            />
            <input
                type="number"
                placeholder="Price 2"
                name="price2"
                value={price2}
                onChange={e => setPrice2(e.target.value)}
            />
            <button onClick={createAndDownloadPDF}>Download PDF</button>
        </div>
    );
}

export default App;
