//Import dependancies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// Define api service
const axios = require(`axios`);

//Add routes
const routes = require("./routes/orderRoutes");

const SERVICE_NAME = `orderservice`;
const HOST = `localhost`;
const PORT = 5006;
const APINAME = "orderapi";
const PROTOCOL = "http";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(routes);

//Register microservice with API
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

//MongoDB data connection
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
