const Order = require("../model/orderModel");
const { v4: uuidv4 } = require("uuid");

// Add product to cart
const addProductToCart = async (req, res, next) => {
  const { productID, productName, quantity, price, productImage } = req.body;
  const userId = "12345678";

  let order = await Order.findOne({ userId });
  if (!order) {
    // Create a new cart if the user doesn't have one
    order = new Order({
      userId,
      products: [
        { productID, productName, quantity, price, productImage, userId },
      ],
      status: "pending",
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

  order.status = "pending";

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
    const userId = req.query.id;
    console.log(userId);

    // if (!ObjectId.isValid(userId)) {
    //   return res.status(400).json({ message: "Invalid user id" });
    // }

    const orders = await Order.find({ userId: userId });

    if (orders.length === 0) {
      return res.status(404).json({ message: "Orders not found" });
    }

    const orderDetails = orders.map((order) => {
      const products = order.products.map((product) => {
        return {
          productID: product.productID,
          productName: product.productName,
          quantity: product.quantity,
          price: product.price,
          productImage: product.productImage,
        };
      });

      return {
        orderId: order._id,
        products: products,
        userId: order.userId,
        total: order.total,
        status: order.status,
      };
    });

    res.status(200).json(orderDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update order status to success
const updateOrderStatus = async (req, res) => {
  let userId = req.query.id;

  const order = await Order.findOneAndUpdate(
    { userId: userId },
    { $set: { status: req.body.status } }
  );

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  } else {
    return res.status(200).json(order);
  }
};

//Delete order by order id
const deleteOrder = async (req, res) => {
  try {
    let userId = req.query.id;

    const deletedOrder = await Order.findOneAndDelete({ userId: userId });

    // const deletedOrder = await Order.findByIdAndDelete(orderId);

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
  updateOrderStatus,
};
