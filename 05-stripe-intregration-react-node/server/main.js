require("dotenv").config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const staticDir = process.env.STATIC_DIR;

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(stripeSecretKey);

const app = express();

app.use(cors());
app.use(express.static(staticDir));
app.use(express.json());

app.get("/config", (req, res) => {
    res.json({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
});

app.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "EUR",
            amount: 1999,
            automatic_payment_methods: { enabled: true },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
});
app.listen(4000, () => console.log("Listening on port 4000!"));
