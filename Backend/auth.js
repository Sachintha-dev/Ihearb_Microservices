const express = require(`express`);
const router = express.Router();
const argon2 = require(`argon2`);
require("dotenv").config();
const mysql = require(`mysql2`);
const jwt = require(`jsonwebtoken`);

const key = "secret";

const HOST = process.env.HOST || "localhost";
const DATABASE = process.env.DATABASE || "auth_db";
const USER = process.env.USER || "auth_user";
const password = process.env.PASSWORD || "p@$sw0rd";
const CONNECTIONLIMT = process.env.connectionLimit || 10;

const pool = mysql.createPool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

router.post("/registercustomer", async (req, res) => {
  const userName = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const userRole = req.body.userrole || "customer"; // set default user role to "customer" if not provided

  try {
    const hashPassword = await argon2.hash(password); // hash the password
    if (!userName || !hashPassword) {
      return res
        .status(400)
        .send({ message: `Username and password are required`, data: null });
    }

    pool.query(
      "INSERT INTO users (username, password, email, userrole) VALUES (?, ?, ?, ?)",
      [userName, hashPassword, email, userRole],
      (err, result) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .send({ message: `Failed registration`, data: result });
          return;
        }
        res
          .status(200)
          .send({ message: `Registration successful`, data: null });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: `Failed registration`, data: null });
  }
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res
      .status(400)
      .send({ message: `Username and password are required`, data: null });
  }

  console.log(email);
  pool.query(
    `SELECT * FROM users WHERE email = ?`,
    [email],
    async (err, result) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send({ message: "Faild log in email is doesnt exsit", data: null });
        return;
      }
      console.log(result);
      if (result.length != 1) {
        res.status(500).send({ message: "Faild log in", data: null });
        return;
      }

      const hashPassword = result[0].password;
      const isPassword = await argon2.verify(hashPassword, password);

      if (!isPassword) {
        res.status(500).send({
          message: "Password is incorrect login is faild",
          data: null,
        });
        return;
      }
      const token = jwt.sign({ user: result[0] }, key, { expiresIn: `1h` });
      const response = {
        message: `Log in successful`,
        data: token,
      };
      res.send(JSON.stringify(response));
    }
  );
});

module.exports = router;
