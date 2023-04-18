let Product = require("../model/products.model");

/*This function adds a new product to the database. 
It extracts the necessary details of the product from the request body, creates a 
new Product object using the extracted data, 
and saves it to the database. If the product is successfully added, it returns a 
JSON response with the message "Product Added".
 If an error occurs during the save operation, it logs the error to the console.*/

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

// Delete Payments
/*This is an asynchronous function that receives a request and response object as parameters. 
It first retrieves the '_id' of the product to be deleted from the query parameter of the request object.
It then uses the Mongoose method 'findByIdAndDelete' to find the product with the specified '_id' and delete it from the database. 
If the operation is successful, it sends a JSON response with a status code of 200 and a message saying "Product deleted". 
If an error occurs, it logs the error and sends a JSON response with a status code of 500 and a message saying "error with delete data".*/
const deleteProduct = async (req, res) => {
  let _id = req.query.id;
  console.log(_id);
  await Product.findByIdAndDelete(_id)

    .then(() => {
      res.status(200).send({ status: "Product deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "error with delete data" });
    });
};

//Get Product
/*This function retrieves a product or a list of products from the database based on the value of the query parameter id. 
If id is not defined, it returns all the products in the database. 
If id is defined, it searches for a product with that specific id value and returns it if found. 
The function uses the findById method if id is defined to find the product with the given id, and the 
find method to retrieve all products when id is not defined. If an error occurs during the database query,
 it returns an error status along with a corresponding error message. 
If the product or list of products is found, it returns a success status along with the product data.*/
const getProduct = async (req, res) => {
  const productId = req.query.id;

  console.log(productId);
  if (productId !== undefined) {
    Product.findById(productId)
      .then((product) => {
        res.status(200).send({ status: "Product fetched", product: product });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ status: "Error with get product", error: err.message });
      });
  } else {
    Product.find()
      .then((products) => {
        res.json(products);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .send({ status: "Error with get products", error: err.message });
      });
  }
};

/*update product
This is a function for updating a product by its ID. It first extracts the product ID from the query parameters of the request. 
It then uses the findOneAndUpdate() method to find the product with that ID and update its details with the new information 
provided in the request body. If the product is successfully updated, 
it returns a JSON response with a status code of 200 and the updated product data. 
If there is no such product with that ID, it returns a JSON response with a status code of 400 and an error message.
*/
const updateProduct = async (req, res) => {
  const { id } = req.query;

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

/*This is an export statement that exports an object containing four functions: addProduct, getProduct, 
updateProduct, and deleteProduct. These functions are likely part of a Node.js module or
 API and can be used by other parts of the application or by external clients to
  perform CRUD operations on a collection of products stored in a database.*/
module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
