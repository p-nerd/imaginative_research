import Template1 from "./components/Template1";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";

const App = () => {
    const handleGeneratePDF = async () => {
        const element = document.querySelector("#capture");
        const canvas = await html2canvas(element, {
            logging: true,
            letterRendering: 1,
            useCORS: true,
        });
        const width = 208;
        const height = (canvas.height * width) / canvas.width;
        const canvasData = canvas.toDataURL("img/png");
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(canvasData, "PNG", 0, 0, width, height);
        pdf.save("clientPDF.pdf");
    };
    const handleGeneratePDF2 = async () => {
        const element = document.querySelector("#capture");
        const worker = html2pdf().from(element).save();
    };

    return (
        <div>
            <button onClick={handleGeneratePDF2}>Generate PDF</button>
            <Template1 />
        </div>
    );
};

export default App;
