import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductTable() {
  const [productRecords, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(
        `http://localhost:5000/products/getProducts`
      );
      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, []);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:5000/products/deleteProduct/${productId}`
      );
      setRecords(productRecords.filter((product) => product._id !== productId));
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="container">
      <h2>View all products</h2>
      <Link
        to={`/admin/newProduct`}
        className="btn btn-primary"
        style={{ float: "right" }}
      >
        Add New Product
      </Link>
      <br />
      <table
        className="table table-bordered"
        style={{
          marginTop: "20px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f5f5f5",
        }}
      >
        <thead
          style={{
            backgroundColor: "lightblue",
          }}
        >
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productRecords.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={product.productImage}
                  alt=""
                  style={{ height: 100, width: 100 }}
                />
              </td>
              <td>{product.productName}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <Link
                  to={`/admin/editProduct/${product._id}`}
                  className="btn btn-warning mr-2"
                >
                  Edit
                </Link>
                &nbsp;&nbsp;
                <button
                  className="btn btn-danger"
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
