import React from "react";
import { useParams } from "react-router-dom";

export default function Attack() {
  const { selectedMoves } = useParams();
  const movesArray = JSON.parse(decodeURIComponent(selectedMoves));
  console.log(movesArray);

  return (
    <div>
      <h1>Attack Page</h1>
      <h2>Selected Moves:</h2>
      <ul>
        {movesArray.map((move, index) => (
          <li >{move}</li>
        ))}
      </ul>
      {/* Rest of your Attack component code */}
    </div>
  );
}
