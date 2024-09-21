const cors = require("cors");
const express = require("express");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

// Middleware
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log('Event received:', event);

    // Handle the event
    switch (event.type) {
      case 'charge.updated':
        const charge = event.data.object;
        console.log(`Charge was updated: ${charge.id}`);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.log(`⚠️ Webhook signature verification failed: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});


app.use(express.json());

app.post("/api/create-checkout-session", async (req, res) => {
  const { product } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100, 
        },
        quantity: product.quantity,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.json({ id: session.id });
});


app.listen(8000, () => {
  console.log("Server started at port 8000");
});
