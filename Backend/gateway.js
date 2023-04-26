const express = require("express");
const cors = require("cors");
const helemt = require("helmet");
const app = express();
const auth = require(`./auth`);
const path = require("path");
const router = require(`./router`);
const morgan = require(`morgan`);
const fs = require(`fs`);
const PORT = 3000;


const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));



app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(`/`, auth);
app.use(`/`, router);
app.use(helemt());

app.listen(PORT, (req, res) => {
  console.log(`Gate way is up and runing on ${PORT}`);
});
