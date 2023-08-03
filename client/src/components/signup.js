import React, { useState } from "react";

export default function SignUpAndLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
//example for hieu
  // const Signup = () => {
  //   // set initial form state
  //   const [userFormData, setUserFormData] = useState({
  //     username: "",
  //     email: "",
  //     password: "",
  //   });
  
  //   // set state for form validation
  //   const [validated] = useState(false);
  //   // set state for alert
  //   const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Form Data: ", formData);
    // Add logic to submit sign-up data to backend or perform desired action
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login Form Data: ", formData);
    // Add logic to submit login data to backend or perform desired action
  };

  return (
    <div>
      <div className="signUpForm">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUpSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
      <div className="loginForm">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
