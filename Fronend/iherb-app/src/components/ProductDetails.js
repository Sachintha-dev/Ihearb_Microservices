import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const addToCart = (productId, productName, quantity, productPrice, image) => {
  const newOrder = {
    productID: productId,
    productName: productName,
    quantity: parseInt(quantity),
    price: productPrice,
    productImage: image,
  };

  const newEmail = {
    to: "nanayakkarasb88@gmail.com",
    subject: "New Item added to cart",
    message: "You are selected" + productName + "With quantity of" + quantity,
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
};

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProductDetails() {
      const response = await fetch(
        `http://localhost:5002/products/getProduct/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      console.log(records);
      setProduct(records);
    }

    fetchProductDetails();
    return;
  }, [params.id]);

  return (
    <div>
      <div>
        <h1>{product.productName}</h1>
        <img src={product.productImage} style={{ height: 300, width: 300 }} />
        <p>Description: {product.productDescription}</p>
        <p>Price : {product.price}</p>
        <p>Product Category: {product.category}</p>
      </div>

      <div
        style={{
          border: "2px solid black",
          padding: "10px",
          backgroundColor: "lightblue",
          width: "35%",
          alignContent: "center",
          marginLeft: 500,
        }}
      >
        <h2>Add to Cart</h2>
        <form>
          <label htmlFor="quantity">Quantity: </label>&nbsp;&nbsp;&nbsp;
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          &nbsp;&nbsp;&nbsp;
          <button
            onClick={() =>
              addToCart(
                product._id,
                product.productName,
                quantity,
                product.price,
                product.productImage
              )
            }
          >
            Add To Cart
          </button>
        </form>
      </div>
    </div>
  );
}
