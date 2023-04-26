const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require(`axios`);
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
app.use(routes);

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
