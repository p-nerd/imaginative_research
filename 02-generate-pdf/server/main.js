const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const htmlPDF = require("html-pdf");

const htmlTemplate = require("./templates/template1");

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/create-pdf", (req, res) => {
    const pdfResult = htmlPDF.create(htmlTemplate(req.body));
    pdfResult.toFile("uploads/result.pdf", err => {
        if (err) {
            return res.send(Promise.reject());
        }
        return res.send(Promise.resolve());
    });
});

app.get("/fetch-pdf", (req, res) => {
    return res.sendFile(`${__dirname}/uploads/result.pdf`);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
