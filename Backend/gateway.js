const express = require("express");
const helemt = require("helmet");
const app = express();
const router = require(`./router`);
const PORT = 3000;

app.use(express.json());
app.use(`/`, router);
app.use(helemt());

app.listen(PORT, (req, res) => {
  console.log(`Gate way is up and runing on ${PORT}`);
});
