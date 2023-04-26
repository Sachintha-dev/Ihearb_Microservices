const express = require("express");
const router = express.Router();
const sendEmail = require("../controllers/emailController.js");


// Route for sending email
router.post("/notificationapi", sendEmail);


module.exports = router;
