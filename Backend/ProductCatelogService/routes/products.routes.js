const router = require("express").Router();
const {
  addProduct,
  getProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controller/products.controller.js");

const addProductRouting = (req, res) => {
  addProduct(req, res);
};

const getProductsRouting = (req, res) => {
  getProducts(req, res);
};

const deleteProductRouting = (req, res) => {
  deleteProduct(req, res);
};

const updateProductRouting = (req, res) => {
  updateProduct(req, res);
};

const getProductRouting = (req, res) => {
  getProduct(req, res);
};

const requestHandler = (req, res) => {
  const method = req.method;
  const id = req.params.id;

  if (method === `POST`) {
    addProductRouting(req, res);
  } else if (method === `GET` && id != null) {
    getProductRouting(req, res);
  } else if (method === `PUT` && id != null) {
    updateProductRouting(req, res);
  } else if (method === `DELETE` && id != null) {
    deleteProductRouting(req, res);
  } else if (method === `GET`) {
    getProductsRouting(req, res);
  } else {
    res.status(404).send(`Route not found`);
  }
};

router.post("/addProduct/", addProductRouting);
router.get("/getProducts/", getProductsRouting);
router.get("/getProduct/:id", getProductRouting);
router.put("/updateProduct/:id", updateProductRouting);
router.delete("/deleteProduct/:id", deleteProductRouting);

module.exports = requestHandler;
