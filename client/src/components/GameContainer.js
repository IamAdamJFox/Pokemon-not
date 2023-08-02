import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import StartMenu from "../pages/StartMenu";
import MoveList from "../pages/MoveList";
import Login from "../components/signup";
// import { Link } from "react-router-dom";

export default function GameContainer() {
  const [currentPage, setCurrentPage] = useState("StartMenu");

  useEffect(() => {
    // Use any logic to determine the current page, for simplicity we will use the state "currentPage"
    // In a real-world scenario, you may use a state management library or other navigation techniques.
    setCurrentPage("StartMenu");
  }, []);

  const renderPage = () => {
    // console.log(currentPage);
    if (currentPage === "StartMenu") {
      return <StartMenu />;
    }
    const handlePageChange = (page) => {
      setCurrentPage(page);
      history.push(`/${page}`); // Update the URL based on the selected page
    };
    if(currentPage == "MoveList"){  
        return <MoveList />;
    }
    if(currentPage == "Login"){
        return <Login />;
    }
    // Add other page rendering logic as needed.
  };

  return (
    <div>
      <div>
        {/* Buttons to change pages */}
        <button onClick={() => handlePageChange("StartMenu")}>Start Menu</button>
        <button onClick={() => handlePageChange("MoveList")}>Move List</button>
        <button onClick={() => handlePageChange("Login")}>Login</button>
      </div>
      <div>{renderPage()}</div>
    </div>
  );
}