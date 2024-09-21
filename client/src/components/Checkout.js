import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51PzJ2YP1GEjp90as6ckPC7rGCo4KZDUvJGfSnf6NQ1xOvlkjJz9LLtWj9EXldKb4uyVP3fdDpWrxn1Z0lDEhG8t1007hSUAUDC");

const Checkout = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    
    const product = {
      name: "Sample Product",
      price: 2000, 
      quantity: 1,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/create-checkout-session", { product });
      const sessionId = response.data.id;

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Error during checkout:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Checkout Page</h2>
      <button disabled={loading} onClick={handleCheckout}>
        {loading ? "Loading..." : "Checkout"}
      </button>
    </div>
  );
};

const StripeWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
};

export default StripeWrapper;
