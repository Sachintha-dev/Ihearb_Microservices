const express = require("express");
const router = express.Router();
const sendEmail = require("../controllers/emailController.js");
// Route for sending email
router.post("/send", sendEmail);

module.exports = router;
