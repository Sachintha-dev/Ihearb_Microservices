import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const addToCart = (productId, productName, productPrice, image) => {
  const newOrder = {
    productID: productId,
    productName: productName,
    quantity: 1,
    price: productPrice,
    productImage: image,
  };

  const response = axios
    .post(`http://localhost:3000/orderservice/orderapi/`, newOrder)
    .then(() => {
      console.log(response.data);
      window.alert("Product added to cart!");
    })

    .catch((err) => {
      alert(err);
      window.alert("Failed to add product to cart");
    });

  const newEmail = {
    to: "senulananayakkara88@gmail.com",
    subject: "New Item added to cart",
    description: "You have selected " + productName + " with a quantity of 1",
  };

  axios
    .post(`http://localhost:5025/sendEmail/send`, newEmail)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to send email");
    });
};

function ProductsHome() {
  const [productRecords, setRecords] = useState([]);
  const [search, setsearch] = useState("");
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(
        `http://localhost:3000/productcatelogservice/productapi/`
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
      <div style={{ display: "flex", marginLeft: 75 }}>
        <div>
          <input
            className="form-control"
            type="search"
            placeholder="Search for Products ..."
            name="searchQuery"
            style={{
              width: "300px",
              height: "50px",
              paddingLeft: "20px",
              fontSize: "18px",
              borderRadius: "25px",
              boxShadow: "0 0 10px 0px rgba(0, 0, 0, 0.1)",
            }}
            onChange={(e) => {
              setsearch(e.target.value);
            }}
          />
        </div>

        <div></div>
      </div>
      <br />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "50px",
        }}
      >
        {productRecords
          .filter((product) =>
            product.productName.toLowerCase().includes(search.toLowerCase())
          )
          .map((product) => {
            return (
              <div
                key={product._id}
                style={{
                  height: "500px",
                  width: "500px",
                  margin: "50px",
                  border: "1px solid black",
                  textAlign: "center",
                  paddingLeft: "10px",
                }}
              >
                <h3>{product.productName}</h3>

                <img
                  src={product.productImage}
                  alt=""
                  class="parts"
                  style={{ height: "250px", width: "300px" }}
                />
                <br />
                <br />
                <div class="order">
                  <form action="{handleSubmit}"></form>

                  <label for="price">Product Price</label>
                  <p>{product.price}</p>

                  <center>
                    <button
                      class="btn btn-success"
                      onClick={() =>
                        addToCart(
                          product._id,
                          product.productName,
                          product.price,
                          product.productImage
                        )
                      }
                      style={
                        {
                          // padding: "5px",
                          // textAlign: "center",
                          // width: "300px;",
                          // alignItems: "center",
                          // backgroundColor: "#3AAFA9",
                          // color: "white",
                          // border: "none",
                          // boxShadow: "0 0 10px 0px rgba(0, 0, 0, 0.1)",
                        }
                      }
                    >
                      Add to Cart
                    </button>
                    <br />
                    <br />
                    &nbsp;&nbsp;
                    <button class="btn btn-warning">
                      <Link
                        to={`/product/${product._id}`}
                        style={{
                          textDecoration: "none",
                          color: "#fff",
                        }}
                      >
                        View Details
                      </Link>
                    </button>
                  </center>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ProductsHome;
