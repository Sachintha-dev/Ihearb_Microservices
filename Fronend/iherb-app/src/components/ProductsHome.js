import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/* const addToCart = async (productId) => {
  const newOrder = {
    productID: productId,
    quantity: 1,
  };

  const response = axios
    .post(`http://localhost:5005/order/addOrder/`, newOrder)
    .then(() => {
      console.log(response.data);
      window.alert("Product added to cart!");
    })

    .catch((err) => {
      alert(err);
      window.alert("Failed to add product to cart");
    });
}; */

function ProductsHome() {
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
  }, [productRecords.length]);

  return (
    <div>
      <br />
      <div>
        {productRecords.map((product) => {
          return (
            <div
              className="container"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "50px",
              }}
            >
              <div
                style={{
                  height: 420,
                  width: 500,
                  margin: 50,
                  border: "1px solid black",
                  textAlign: "center",
                  paddingLeft: 10,
                }}
              >
                <h3>{product.productName}</h3>

                <img
                  src={product.productImage}
                  alt=""
                  class="parts"
                  style={{ height: 250, width: 300 }}
                />
                <br />
                <br />
                <div class="order">
                  <form action="{handleSubmit}"></form>

                  <label for="price">Product Price</label>
                  <p>{product.price}</p>

                  <center>
                    <button
                      
                      style={{
                        padding: "5px",
                        textAlign: "center",
                        width: "200px;",
                        alignItems: "center",
                      }}
                    >
                      Add to Cart
                    </button>
                    <br />
                    <button class="btn btn-warning">
                      <Link to={`/product/${product._id}`}>View Details</Link>
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </center>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductsHome;