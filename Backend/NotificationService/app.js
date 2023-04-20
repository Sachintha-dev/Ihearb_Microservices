const express = require("express");
const bodyParser = require("body-parser");
const emailRoutes = require("./routes/emailRoutes");

const app = express();
const port = 5025;

app.use(bodyParser.json());
// Load environment variables from .env file
require("dotenv").config();

//Routes
app.use("/sendEmail", emailRoutes);

// middleware
app.use(express.json());

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
