import React, { useState } from "react";

function SignupForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password Mismatch");
      return false;
    }
    // Handle form submission here
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url("https://images.ctfassets.net/co0pvta7hzrh/1HOajBVHsh7xunfUnjpDNE/c94d271e8f90a6bf6016fc1d275d7a74/e_commerce_registration_form_template_thumb.png")`,
        backgroundSize: "cover",
        minHeight: "100",
      }}
    >
      <div className="description">
        <h1 style={{ color: "red" }}>Become an Iherb Member</h1>
        <h4 style={{ fontSize: "23px" }}>
          Create your member Profile and get access to very qualtiy and better
          products. Please enter in your personal details and collaborate with
          us.
        </h4>
      </div>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <fieldset
          className="form-fieldset"
          style={{
            border: "2px solid rgb(10, 15, 15)",
            width: "40%",
            marginLeft: "400px",
            backgroundColor: "lightGrey",
            opacity: 0.8,
          }}
        >
          <legend style={{ fontSize: "20px", fontWeight: "550" }}>
            Member Signup Form
          </legend>
          <hr />
          <label htmlFor="first" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-input"
            style={{ height: "30px", backgroundColor: "white" }}
            class="focus"
            name="first"
            placeholder="First Name"
            id="first"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="last" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            style={{ height: "30px", backgroundColor: "white" }}
            class="focus"
            className="form-input"
            name="last"
            placeholder="Last Name"
            id="last"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="tel" className="form-label">
            Contact Number
          </label>
          <input
            type="text"
            style={{ height: "30px", backgroundColor: "white" }}
            class="focus"
            className="form-input"
            name="tel"
            placeholder="Contact Number"
            required
          />
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            style={{ height: "30px", backgroundColor: "white" }}
            class="focus"
            className="form-input"
            name="email"
            placeholder="Email"
            required
          />
          <br />
          <br />
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            style={{ height: "30px", backgroundColor: "white" }}
            class="focus"
            className="form-input"
            name="address"
            placeholder="Address"
            required
          />
          <br />
          <br />
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            style={{ height: "30px", backgroundColor: "white" }}
            class="focus"
            className="form-input"
            name="username"
            placeholder="Username"
            required
          />
          <br />
          <br />
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            style={{ height: "30px", backgroundColor: "white" }}
            class="focus"
            className="form-input"
            name="password"
            placeholder="Password"
            id="password"
            required
          />
          <br />
          <br />
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-input"
            style={{ height: "30px", backgroundColor: "white" }}
            class="focus"
            name="cpassword"
            placeholder="Confirm Password"
            id="cpassword"
            required
          />
          <br />
          <br />
          <button
            type="submit"
            className="form-submit"
            style={{
              backgroundColor: "rgb(6, 171, 248)",
              padding: "8px",
              width: "55%",
              borderRadius: "5px",
              color: "white",
              fontWeight: "bold",
              marginLeft: "25px",
            }}
          >
            Submit
          </button>
          <br />
          <br />
        </fieldset>
      </form>
    </div>
  );
}

export default SignupForm;
