const router = require("express").Router();

const {
  addProductToCart,
  getOrderDetails,
  deleteOrder,
} = require("../controller/orderController.js");

//Add product to cart
router.post("/orderapi", addProductToCart);

//Get order details for a user/session id
router.get("/orderapi", getOrderDetails);

//Delete order by orderid
router.delete("/orderapi", deleteOrder);
module.exports = router;
