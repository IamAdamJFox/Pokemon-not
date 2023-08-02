import React from "react";
import { useLocation } from "react-router-dom";
import selectedMoves from "./MoveList";

export default function Attack() {
    const location = useLocation();
    const selectedMoves = location.state?.selectedMoves || [];
  
    console.log("Received Moves in Attack:", selectedMoves);


  return (
    <div>
      <h1>Attack Page</h1>
      <h2>Selected Moves:</h2>
      <ul>
        {selectedMoves.map((move, index) => (
          <li key={index}>{move}</li>
        ))}
      </ul>
      {/* Rest of your Attack component code */}
    </div>
  );
}
