const router = require("express").Router();
const {
  requireSignin,
  adminMiddleware,
  userMiddleware,
} = require("../middleware/index");

const {
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/products.controller.js");

//add new product
router.post("/addProduct/", addProduct);

//get all products
router.get("/getproduct", getProduct);

//Update product
router.put("/updateProduct/:id", updateProduct);

//Delete product
router.delete("/deleteProduct/:id", deleteProduct);

// Search for product
router.get("/getProduct/:id", getProduct);

module.exports = router;
