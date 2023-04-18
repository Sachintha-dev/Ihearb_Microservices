const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const prodctRoutes = require("./routes/products.routes.js");
const axios = require(`axios`);

const app = express();

const SERVICE_NAME = `productcatelogservice`;
const HOST = `localhost`;
const PORT = 5002;
const APINAME = "getproduct";
const PROTOCOL = "http";

app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();

// middleware
//app.use(express.json());

//routes
app.use("/products", prodctRoutes);

mongoose
  .connect(
    "mongodb+srv://Senula:sack1234@cluster0.ayfzk0o.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

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

app.get(`/getproduct`, (req, res, next) => {
  res.send("Hello from product service");
});
