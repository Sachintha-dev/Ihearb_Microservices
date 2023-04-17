const router = require("express").Router();

const {
  addProductToCart,
  getOrderDetails,
  deleteOrder,
} = require("../controller/orderController.js");

//Add product to cart
router.post("/addOrder", addProductToCart);

//Get order details for a user/session id
router.get("/getOrderDetails/:userId", getOrderDetails);

//Delete order by orderid
router.delete("/deleteOrder/:userId", deleteOrder);
module.exports = router;
