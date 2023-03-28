import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const Payment = () => {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch("http://localhost:4000/config").then(async r => {
            const { publishableKey } = await r.json();
            // console.log(publishableKey);
            setStripePromise(loadStripe(publishableKey));
        });
    }, []);

    useEffect(() => {
        fetch("http://localhost:4000/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({}),
        }).then(async r => {
            const { clientSecret } = await r.json();
            // console.log(clientSecret);
            setClientSecret(clientSecret);
        });
    }, []);

    return (
        <>
            <h2>React Stripe and the Payment Element</h2>
            {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    );
};

export default Payment;
