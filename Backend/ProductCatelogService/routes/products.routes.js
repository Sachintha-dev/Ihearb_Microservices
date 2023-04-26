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
router.post("/productapi", addProduct);

//Update product
router.put("/productapi", updateProduct);

//Delete product
router.delete("/productapi", deleteProduct);

// Search for product
router.get("/productapi", getProduct);

module.exports = router;
