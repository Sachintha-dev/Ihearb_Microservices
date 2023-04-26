const express = require("express");
const router = express.Router();
const sendEmail = require("../controllers/emailController.js");
const axios = require(`axios`);
const app = express();

// Route for sending email
router.post("/send", sendEmail);

const SERVICE_NAME = `orderservice`;
const HOST = `localhost`;
const PORT = 50;
const APINAME = "notificationapi";
const PROTOCOL = "http";


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

module.exports = router;
