//Import dependancies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require(`axios`);
//Add routes
const emailRoutes = require("./routes/emailRoutes");

const app = express();
app.use(bodyParser.json());

// Define api service
const SERVICE_NAME = `notificationservice`;
const HOST = `localhost`;
const PORT = 5020;
const APINAME = "notificationapi";
const PROTOCOL = "http";

// middleware
app.use(cors());
app.use(express.json());
app.use(emailRoutes);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Register microservice with API
app.listen(PORT, (req, res) => {
  console.log(PORT);
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
