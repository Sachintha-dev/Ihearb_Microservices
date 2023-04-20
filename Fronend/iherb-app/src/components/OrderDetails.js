import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const OrderList = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  //window.alert(`${params.userId}`);
  useEffect(() => {
    async function fetchOrderDetails() {
      const response = await fetch(
        `http://localhost:5006/order/getOrderDetails/${params.userId}`
      );

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const orderDetails = await response.json();
      console.log(orderDetails);
      setOrderDetails(orderDetails);
    }
    fetchOrderDetails();
    return;
  }, [orderDetails.length]);

  async function deleteCart(userID) {
    const response = await fetch(
      `http://localhost:5006/order/deleteOrder/${userID}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      navigate("/");
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        padding: "20px",
        borderRadius: "10px",
        margin: "20px",
      }}
    >
      <h1>Order Details</h1>
      {orderDetails.map((order) => {
        return (
          <div>
            <div
              className="products"
              style={{
                backgroundColor: "#f9f9f9",
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
              }}
            >
              {order.products.map((product) => {
                return (
                  <div
                    key={product.productId}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      border: "1px solid black",
                    }}
                  >
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      style={{ width: "150px", marginRight: "20px" }}
                    />
                    <div className="product-details">
                      <p className="name">{product.productName}</p>
                      <p className="price">Price: {product.price}</p>
                      <p className="quantity">Quantity: {product.quantity}</p>
                    </div>
                  </div>
                );
              })}
              <p
                className="total"
                style={{ color: "red", fontSize: 20, padding: 10 }}
              >
                Total: {order.total}
              </p>
              <button
                class="btn btn-danger"
                onClick={() => {
                  deleteCart(`${params.userId}`);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
