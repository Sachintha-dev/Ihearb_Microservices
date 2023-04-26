const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require(`axios`);
const routes = require("./routes/products.routes");
const app = express();

const SERVICE_NAME = `productcatelogservice`;
const HOST = `localhost`;
const PORT = 5002;
const APINAME = "productapi";
const PROTOCOL = "http";

app.use(cors());
require("dotenv").config();
app.use(express.json());
app.use(routes);

/*This code establishes a connection to a MongoDB database using the Mongoose library. 
The connect() method is called with a MongoDB Atlas URI string and a configuration object 
that specifies some options for the connection, including the useNewUrlParser and useUnifiedTopology options.
If the connection is successful, a message is logged to the console indicating that the connection was established. 
If there is an error connecting to the database, the catch block logs the error to the console.*/
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

/*
This function starts the server by listening on a specified port, 
and then sends a registration request to a centralized registry service using the Axios library. 
The registration request includes information about the current service, such as its name, 
API name,protocol, host, port, and whether it's enabled. This information is sent in the form 
of a JSON payload with specific headers. 
Once the registration request is successfully sent and received, the response from the registry service is logged to the console.
This function is commonly used in a microservices architecture to 
register a new service with a centralized service registry and discovery 
mechanism, allowing other services to discover and consume its functionality.*/
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
