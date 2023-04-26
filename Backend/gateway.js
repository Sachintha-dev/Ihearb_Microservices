const express = require("express");
const helemt = require("helmet");
const app = express();
const auth = require(`./auth`);
const router = require(`./router`);
const PORT = 3000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(`/`, auth);
app.use(`/`, router);
app.use(helemt());

app.listen(PORT, (req, res) => {
  console.log(`Gate way is up and runing on ${PORT}`);
});
