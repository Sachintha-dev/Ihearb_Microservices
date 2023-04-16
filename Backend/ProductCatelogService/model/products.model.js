const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const productSchema = new Schema({
  productID: {
    type: String,
    required: true,
  },

  productName: {
    type: String,
    required: true,
  },

  productDescription: {
    type: String,
    required: true,
  },

  productImage: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  stockQuantity: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
