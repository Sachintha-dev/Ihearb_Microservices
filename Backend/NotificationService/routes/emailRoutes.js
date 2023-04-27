const express = require("express");
const router = express.Router();
const sendEmail = require("../controllers/emailController.js");
const axios = require(`axios`);
const app = express();

// Route for sending email
router.post("/notificationapi", sendEmail);

module.exports = router;
