const router = require("express").Router();
const {
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/products.controller.js");

/*These functions are router handlers that wrap the controller functions addProduct(), getProduct(), deleteProduct(), 
and updateProduct(). They receive HTTP requests and responses and pass them as arguments to the corresponding controller functions. 
By doing so, they provide a way to link specific URLs to specific functionality, which allows the server to handle different types of requests 
to different endpoints.*/
const addProductRouting = (req, res) => {
  addProduct(req, res);
};

const getProductRouting = (req, res) => {
  getProduct(req, res);
};

const deleteProductRouting = (req, res) => {
  deleteProduct(req, res);
};

const updateProductRouting = (req, res) => {
  updateProduct(req, res);
};

/*This is a request handler function that handles HTTP requests to a server.
 It takes in the request and response objects as parameters, extracts the ID 
 parameter and method from the request object, and then uses a switch statement 
 to call the appropriate function for the corresponding HTTP method (POST, GET, PUT, or DELETE).
If the method is PUT or DELETE, it checks if the ID parameter exists, and if so, it calls the corresponding function.
 Otherwise, it sends a 404 error response.
If none of the HTTP methods match, it sends a 404 error response as well. 
This function essentially acts as a middleware between the client and the server, 
routing incoming requests to the appropriate function for processing.*/
const requestHandler = (req, res) => {
  const method = req.method;

  switch (method) {
    case "POST":
      addProductRouting(req, res);
      break;
    case "GET":
      getProductRouting(req, res);
      break;
    case "PUT":
      updateProductRouting(req, res);
      break;
    case "DELETE":
      deleteProductRouting(req, res);
      break;
    case "UPDATE":
      updateProductRouting(req, res);
      break;
    default:
      res.status(404).send("Route not found");
      break;
  }
};

/*These are route definitions for an Express router object. 
They specify the HTTP method and endpoint URL path for each route, 
as well as the corresponding function to handle the request and response for that route.*/
router.post("/addProduct/", addProductRouting);
router.get("/getProduct/:id", getProductRouting);
router.put("/updateProduct/:id", updateProductRouting);
router.delete("/deleteProduct/:id", deleteProductRouting);

module.exports = requestHandler;
