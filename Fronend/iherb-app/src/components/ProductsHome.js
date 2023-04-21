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
    .post(`http://localhost:5006/order/addOrder/`, newOrder)
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
      const response = await fetch(`http://localhost:5002/products/getProduct`);
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
            onChange={(e) => {
              setsearch(e.target.value);
            }}
          ></input>
        </div>

        <div></div>
      </div>
      <br />
      <div>
        {productRecords
          .filter((product) =>
            product.productName.toLowerCase().includes(search.toLowerCase())
          ) //.filter((product => productName.includes)
          .map((product) => {
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
                        onClick={() =>
                          addToCart(
                            product._id,
                            product.productName,
                            product.price,
                            product.productImage
                          )
                        }
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
