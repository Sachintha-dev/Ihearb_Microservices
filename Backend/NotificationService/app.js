const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const emailRoutes = require("./routes/emailRoutes");

const app = express();
const port = 5025;

const SERVICE_NAME = `orderservice`;
const HOST = `localhost`;
const PORT = 5050;
const APINAME = "notificationapi";
const PROTOCOL = "http";

app.use(bodyParser.json());

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

// middleware
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

//Routes
app.use("/sendEmail", emailRoutes);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
