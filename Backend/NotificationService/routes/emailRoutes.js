const express = require("express");
const router = express.Router();
const sendEmail = require("../controllers/emailController.js");
const axios = require(`axios`);
const app = express();

// Route for sending email
router.post("/send", sendEmail);


module.exports = router;
