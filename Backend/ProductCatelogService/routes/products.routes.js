const router = require("express").Router();

const {
  addProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controller/products.controller.js");

//add new product
router.post("/addProduct/", addProduct);

//get all products
router.get("/getProducts/", getProducts);

//Update product
router.put("/updateProduct/:id", updateProduct);

//Delete product
router.delete("/deleteProduct/:id", deleteProduct);

// Search for product
router.get("/getProduct/:id", getProduct);

module.exports = router;
