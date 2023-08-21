import React from 'react';
import { useNavigate } from "react-router-dom";
import Auth from '../utils/auth';

function LoginLogoutButton() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (Auth.loggedIn()) {
      Auth.logout();
      navigate("/"); // Redirect to home after logging out
    } else {
      navigate("/login");
    }
  };

  return (
    <button onClick={handleButtonClick}>
      {Auth.loggedIn() ? "Logout" : "Login"}
    </button>
  );
}

export default LoginLogoutButton;