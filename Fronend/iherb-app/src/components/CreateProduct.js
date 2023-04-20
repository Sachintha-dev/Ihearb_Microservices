import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function CreateProduct() {
  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      productID,
      productName,
      productDescription,
      productImage,
      price,
      category,
      stockQuantity,
    };
    axios
      .post("http://localhost:5002/products/addProduct", newProduct)
      .then((res) => {
        console.log(res.data);
        alert("Product Added Successfully!");
        navigate("/admin/Products");
      })
      .catch((err) => {
        console.log(err);
        alert("Error Adding Product!");
      });
  };

  return (
    <div className="container">
      <br />
      <fieldset
        style={{
          backgroundColor: "#A9CCE3",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <h2>Add New Product</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ display: "flex", fontSize: 20 }}>Product ID:</label>

            <input
              type="text"
              className="form-control"
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid black",
              }}
              onChange={(e) => setProductID(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label style={{ display: "flex", fontSize: 20 }}>
              Product Name:
            </label>

            <input
              type="text"
              className="form-control"
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid black",
              }}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label style={{ display: "flex", fontSize: 20 }}>
              Product Description:
            </label>

            <input
              type="text"
              className="form-control"
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid black",
              }}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label style={{ display: "flex", fontSize: 20 }}>
              Product Image:
            </label>

            <input
              type="text"
              className="form-control"
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid black",
              }}
              onChange={(e) => setProductImage(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label style={{ display: "flex", fontSize: 20 }}>Price:</label>

            <input
              type="number"
              className="form-control"
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid black",
              }}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label style={{ display: "flex", fontSize: 20 }}>Category:</label>

            <input
              type="text"
              className="form-control"
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid black",
              }}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label style={{ display: "flex", fontSize: 20 }}>
              Stock Quantity:
            </label>

            <input
              type="number"
              className="form-control"
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid black",
              }}
              onChange={(e) => setStockQuantity(e.target.value)}
              required
            />
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </fieldset>
    </div>
  );
}

export default CreateProduct;
