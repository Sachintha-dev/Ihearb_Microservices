let Product = require("../model/products.model");

const addProduct = async (req, res) => {
  const productID = req.body.productID;
  const productName = req.body.productName;
  const productDescription = req.body.productDescription;
  const productImage = req.body.productImage;
  const price = Number(req.body.price);
  const category = req.body.category;
  const stockQuantity = Number(req.body.stockQuantity);

  const newProduct = new Product({
    productID,
    productName,
    productDescription,
    productImage,
    price,
    category,
    stockQuantity,
  });

  newProduct
    .save()
    .then(() => {
      res.json("Product Added");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Get all products

const getProducts = async (req, res) => {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete Payments

const deleteProduct = async (req, res) => {
  let _id = req.params.id;

  await Product.findByIdAndDelete(_id)

    .then(() => {
      res.status(200).send({ status: "Product deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "error with delete data" });
    });
};

//Search Product

const getProduct = async (req, res) => {
  let productID = req.params.id;
  Product.findById(productID)
    .then((product) => {
      res.status(200).send({ status: "Product fetched", product: product });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with get product", error: err.message });
    });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!product) {
    return res.status(400).json({ error: "No such product" });
  } else {
    return res.status(200).json(product);
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
