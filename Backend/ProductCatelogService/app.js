const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const prodctRoutes = require("./routes/products.routes.js");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();

// middleware
//app.use(express.json());

//routes
app.use("/products", prodctRoutes);

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
