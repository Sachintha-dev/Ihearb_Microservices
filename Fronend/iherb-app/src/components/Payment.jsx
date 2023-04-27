import React from "react";
import axios from "axios";

export default function Checkout() {
  const onClick = async (event) => {
    event.preventDefault();
    const items = [
      { id: 1, quantity: 3 },
      { id: 2, quantity: 2 },
      { id: 3, quantity: 2 },
    ];

    const newEmail = {
      to: "senulananayakkara88@gmail.com",
      subject: "Payment checkout successfull",
      description: "You have selected " + items.length + " items",
    };

    try {
      await axios.post(
        "http://localhost:3000/notificationservice/notificationapi/",
        newEmail
      );
      const response = await axios.post(
        "http://localhost:4000/create-checkout-session",
        {
          items: items,
        }
      );
      window.location = response.data.url;
    } catch (err) {
      console.log(err.message);
      alert("Failed to complete checkout");
    }
  };

  return (
    <div>
      <button type="submit" className="btn btn-success" onClick={onClick}>
        Checkout
      </button>
    </div>
  );
}
