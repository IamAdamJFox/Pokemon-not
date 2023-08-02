import React, { useState, useEffect } from "react";
import StartMenu from "../pages/StartMenu";
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
    if(currentPage == "MoveList"){  
        return <MoveList />;
    }
    // Add other page rendering logic as needed.
  };

  return (
    <div>
      {renderPage()}
    </div>
  );
}
