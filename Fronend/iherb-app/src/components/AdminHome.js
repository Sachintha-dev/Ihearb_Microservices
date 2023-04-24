import React from "react";

const AdminHome = () => {
  return (
    <div
      style={{
        backgroundImage: `url("https://www.newgenapps.com/hubfs/Imported_Blog_Media/eCommerce-Website-Components-photo.jpg")`,
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1>Admin Home Page</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <button
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            User Management
          </button>
          <button
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            <a href="http://localhost:3000/admin/Products/">
              Product Management
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
