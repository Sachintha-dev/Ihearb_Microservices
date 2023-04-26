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

//get all products
router.get("/productapi", getProduct);

//Update product
router.put("/productapi/:id", updateProduct);

//Delete product
router.delete("/productapi/:id", deleteProduct);

// Search for product
router.get("/productapi/:id", getProduct);

module.exports = router;
