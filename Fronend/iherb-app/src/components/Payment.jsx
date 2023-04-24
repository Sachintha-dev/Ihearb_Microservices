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

    try {
      const response = await axios.post("http://localhost:4000/create-checkout-session", {
        items: items,
      });
      window.location = response.data.url;
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <button type='submit' className='btn btn-success' onClick={onClick}>
        Checkout
      </button>
    </div>
  );
}