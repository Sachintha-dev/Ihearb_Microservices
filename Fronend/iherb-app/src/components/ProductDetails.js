import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    async function fetchProductDetails() {
      const response = await fetch(
        `http://localhost:5000/products/getProduct/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      console.log(records);
      setProduct(records.product);
    }

    fetchProductDetails();
    return;
  }, [params.id]);

  return (
    <div>
      <div>
        <h1>{product.Name}</h1>
        <img src={product.productImage} style={{ height: 300, width: 300 }} />
        <p>Description: {product.Description}</p>
        <p>Price : {product.price}</p>
        <p>Product Category: {product.category}</p>
      </div>

     {/*  <div
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
          <input type="number" />
          &nbsp;&nbsp;&nbsp;<button>Add To Cart</button>
        </form>
      </div> */}
    </div>
  );
}
