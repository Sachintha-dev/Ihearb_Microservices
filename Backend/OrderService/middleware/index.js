const jwt = require("jsonwebtoken");

// checks whether the user have a valid session
const key = "secret";
const requireSignin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, key);
    req.user = decoded.user;
    console.log(req.user.userrole);
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid token" });
  }
};

const userMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, key);
    req.user = decoded.user;
    // Check user role
    console.log("user access done");
    if (req.user.userrole !== "customer" || req.user.userrole !== "customer") {
      // Replace "admin" with the role you want to check
      return res.status(403).send({ message: "Customer Access denied" });
    }
  } catch {
    return res.status(401).send({ message: "Invalid token" });
  }
  next();
};

const adminMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, key);
    req.user = decoded.user;
    // Check user role
    console.log("user access done");
    if (req.user.userrole !== "Admin" || req.user.userrole !== "admin") {
      // Replace "admin" with the role you want to check
      return res.status(403).send({ message: "Admin Access denied" });
    }
  } catch {
    return res.status(401).send({ message: "Invalid token" });
  }
  next();
};

module.exports = {
  adminMiddleware,
  userMiddleware,
  requireSignin,
};
