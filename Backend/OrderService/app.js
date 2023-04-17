const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require(`axios`);

const SERVICE_NAME = `orderservice`;
const HOST = `localhost`;
const PORT = 5006;
const APINAME = "getorders";
const PROTOCOL = "http";

const app = express();

const OrderRoutes = require("./routes/orderRoutes.js");

app.use(bodyParser.json());
app.use(cors());

// middleware
app.use(express.json());

//routes
app.use("/order", OrderRoutes);

mongoose
  .connect(
    "mongodb+srv://senulananayakkara88:sack1234@productdb.cyqr0hj.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connection sucess"))
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

app.get(`/orderService`, (req, res, next) => {
  res.send("hello from orderservice");
});
