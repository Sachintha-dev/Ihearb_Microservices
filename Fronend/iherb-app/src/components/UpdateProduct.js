import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProduct() {
  const [productID, updateProductID] = useState("");
  const [productName, updateProductName] = useState("");
  const [productDescription, updateProductDescription] = useState("");
  const [productImage, updateProductImage] = useState("");
  const [price, updatePrice] = useState("");
  const [category, updateCategory] = useState("");
  const [stockQuantity, updateStockQuantity] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:3000/productcatelogservice/productapi/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      updateProductID(record.product.productID);
      updateProductName(record.product.productName);
      updateProductDescription(record.product.productDescription);
      updateProductImage(record.product.productImage);
      updatePrice(record.product.price);
      updateCategory(record.product.category);
      updateStockQuantity(record.product.stockQuantity);

      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
    }

    fetchData();
    return;
  }, [params.id, navigate]);

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
      .put(
        `http://localhost:5002/products/updateProduct?id=${params.id}`,
        newProduct
      )
      .then((res) => {
        console.log(res.data);
        alert("Product updated Successfully!");
        navigate("/admin/Products");
      })
      .catch((err) => {
        console.log(err);
        alert("Error updating Product!");
      });
  };

  return (
    <div className="container">
      <br />
      <fieldset
        style={{
          backgroundColor: "lightgray",
          padding: "30px",
          borderRadius: "20px",
        }}
      >
        <h2>Update Product</h2>

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
              onChange={(e) => updateProductID(e.target.value)}
              value={productID}
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
              value={productName}
              onChange={(e) => updateProductName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label style={{ display: "flex", fontSize: 20 }}>
              Product Description:
            </label>

            <textarea
              type="text"
              className="form-control"
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid black",
                height: 200,
              }}
              value={productDescription}
              onChange={(e) => updateProductDescription(e.target.value)}
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
              value={productImage}
              onChange={(e) => updateProductImage(e.target.value)}
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
              value={price}
              onChange={(e) => updatePrice(e.target.value)}
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
              value={category}
              onChange={(e) => updateCategory(e.target.value)}
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
              value={stockQuantity}
              onChange={(e) => updateStockQuantity(e.target.value)}
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

export default UpdateProduct;
