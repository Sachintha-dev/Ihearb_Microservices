const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 5005;
const OrderRoutes = require("./routes/orderRoutes.js");

app.use(bodyParser.json());
app.use(cors());

// middleware
app.use(express.json());

//routes
app.use("/order", OrderRoutes);

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

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
