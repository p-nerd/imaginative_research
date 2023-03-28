import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const promise = loadStripe(
    "pk_test_51MqKbFIHBc31Mw766bLo055BWvTMQR60IGEEhyJBJWvdgE0xoFBjJ8bZmnJqCzJUIQQKV4nXHCPX1omRnKZlOirw00xLdqStLI"
);

export default function App() {
    return (
        <div className="App">
            <Elements stripe={promise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
}
