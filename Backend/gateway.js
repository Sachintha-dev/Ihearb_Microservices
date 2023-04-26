const express = require("express");
const cors = require("cors");
const helemt = require("helmet");
const app = express();
const auth = require(`./auth`);
const router = require(`./router`);
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"], // Add DELETE method here
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
