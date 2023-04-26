const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: [
    {
      productID: {
        type: String,
        required: true,
      },

      productName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },

      price: {
        type: Number,
        required: true,
        default: 1,
      },

      productImage: {
        type: String,
        required: true,
      },
    },
  ],

  userId: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },

  status: {
    type: String,
    required: true,
    default: "pending",
  },
});

orderSchema.methods.calculateTotal = function () {
  let total = 0;
  this.products.forEach((product) => {
    total += product.price * product.quantity;
  });
  this.total = total;
};

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
