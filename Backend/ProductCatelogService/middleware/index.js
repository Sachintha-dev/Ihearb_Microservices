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
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid token" });
  }
};

// checks whetherthe user is a normal user
const userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({
      message: "User access Denied",
    });
  }
  next();
};

// checks whether the user that send the request is an admin
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({
      message: "Admin access Denied",
    });
  }
  next();
};

module.exports = {
  adminMiddleware,
  userMiddleware,
  requireSignin,
};
