const Order = require("../model/orderModel");
const { v4: uuidv4 } = require("uuid");

// Add product to cart
const addProductToCart = async (req, res, next) => {
  const { productID, productName, quantity, price, productImage } = req.body;
  const userId = "12345678";

  // let order = await Order.findOne({
  //   products: { $elemMatch: { userId: userId } },
  // });

  let order = await Order.findOne({ userId });
  if (!order) {
    // Create a new cart if the user doesn't have one
    order = new Order({
      userId,
      products: [
        { productID, productName, quantity, price, productImage, userId },
      ],
    });
  } else {
    // Add the product to the user's existing cart
    const productIndex = order.products.findIndex(
      (item) => item.productID == productID
    );
    if (productIndex > -1) {
      // If the product already exists in the cart, update its quantity
      order.products[productIndex].quantity += quantity;
    } else {
      // Otherwise, add a new product to the cart
      order.products.push({
        productID,
        productName,
        quantity,
        price,
        productImage,
        userId,
      });
    }
  }

  // Calculate the final total of the payment
  order.total = order.products.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  await order
    .save()
    .then(() => {
      res.status(200).json({ success: true, message: "Product added to cart" });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    });
};

// Get order details for a specific user

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    if (!ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const order = await Order.findById(orderId).populate("products.productID");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const products = order.products.map((product) => {
      return {
        productID: product.productID,
        productName: product.productName, // name of the product (not the model) ids are unique so we can just use product.productID.to
        quantity: product.quantity,
        price: product.price,
        productImage: product.productImage, // imageURL is a reference to the image in the db.  this is a string.  it can be accessed
      };
    });

    const orderDetails = {
      orderId: order._id,
      products: products,
      userId: order.userId,
      total: order.total,
    };

    res.status(200).json(orderDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Delete order by order id
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getOrderDetails,
  addProductToCart,
  deleteOrder,
};
