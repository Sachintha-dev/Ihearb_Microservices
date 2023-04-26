require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const axios = require(`axios`);

const SERVICE_NAME = `paymentservice`;
const HOST = `localhost`;
const PORT = 4000;
const APINAME = "getpayment";
const PROTOCOL = "http";

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

const storeItems = new Map([
  [1, { priceInCents: 3000, name: "Fancy Hat" }],
  [2, { priceInCents: 4000, name: "Long Cloak" }],
  [3, { priceInCents: 2000, name: "Magic Beans" }],
]);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items.map((items) => {
        const storeItem = storeItems.get(items.id);
        console.log("Store item:", storeItem);

        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: items.quantity,
        };
      }),
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}`,
      cancel_url: `${process.env.CLIENT_URL}`,
    });

    if (session) {
      // Redirect to the URL obtained from session.url
      res.json({ url: session.url });
    } else {
      // If session.url is not present in the response, return an error
      console.log("Stripe API response:", session);
      res.status(500).json({ error: "Failed to create session" });
    }
    console.log(session.url);
    const items = req.body.items;
    console.log("Items array from client:", items);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "Payment Failed" });
  }
});

app.listen(PORT, (req, res) => {
  axios({
    method: "POST",
    url: "http://localhost:3000/register",
    headers: { "Content-Type": "application/json" },
    data: {
      serviceName: SERVICE_NAME,
      apiName: APINAME,
      protocol: PROTOCOL,
      host: HOST,
      port: PORT,
      enabled: true,
    },
  }).then((response) => {
    console.log(response.data);
  });
});

app.get(`/getpayment`, (req, res, next) => {
  res.send("hello from orderservice");
});
