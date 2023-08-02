import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Import useParams to access route parameters

// Sample Pokémon data
const pokemonData = [
  { id: 1, name: "Bulbasaur", moves: ["Tackle", "Vine Whip"] },
  { id: 2, name: "Charmander", moves: ["Scratch", "Ember"] },
  { id: 3, name: "Squirtle", moves: ["Tackle", "Water Gun"] },
  { id: 4, name: "Pikachu", moves: ["Quick Attack", "Thunder Shock"] },
];

export default function MoveList() {
  const { pokemonId } = useParams(); // Get the 'pokemonId' parameter from the URL

  // Find the selected Pokémon based on the ID
  const selectedPokemon = pokemonData.find(
    (pokemon) => pokemon.id === parseInt(pokemonId)
  );

  if (!selectedPokemon) {
    return <div>Pokémon not found.</div>;
  }

  // Local storage key to store selected moves
  const localStorageKey = `selectedMoves_${selectedPokemon.name}`;

  const [selectedMoves, setSelectedMoves] = useState([]); // State to store selected moves
  
  useEffect(() => {
    // Load selected moves from local storage
    const selectedMoves = JSON.parse(localStorage.getItem("selectedMoves")) || [];
    console.log("localStorage selectedMoves:", selectedMoves);
    // Update the state
    setSelectedMoves(selectedMoves);
  }, [localStorageKey]);  // Add localStorageKey as a dependency

  // Function to handle move selection
  const handleMoveSelect = (move) => {
    // Check if the move is already selected
    if (!selectedMoves.includes(move)) {
      // Add the move to the list of selected moves
      const updatedMoves = [...selectedMoves, move];
      // Update the state
      setSelectedMoves(updatedMoves);
      // Save the updated list of moves to local storage
      localStorage.setItem(localStorageKey, JSON.stringify(updatedMoves));
      console.log(updatedMoves);
    }
  };


  return (
    <div>
      <div className="startHeader">
        <h1>Pokemon Not</h1>
      </div>
      <h2>{selectedPokemon.name}</h2>
      <h3>Selected Moves:</h3>
      <ul>
        {selectedMoves.map((move, index) => (
          <li key={index}>{move}</li>
        ))}
      </ul>
      <h3>All Moves:</h3>
      <ul>
        {selectedPokemon.moves.map((move, index) => (
          <li
            key={index}
            className={selectedMoves.includes(move) ? "selected-move" : ""}
            onClick={() => handleMoveSelect(move)}
          >
            {move}
          </li>
        ))}
      </ul>
      {console.log("Passing Moves to Attack:", selectedMoves)} {/* Add this line */} 
      <Link
        to={{
          // Pass the selected moves to the Attack component
          pathname: "/Attack/",
          state: {
            // Pass the selected moves to the Attack component
            selectedMoves: [...selectedMoves, ...selectedPokemon.moves],
          },
        }}
      >
        <button>Attack</button>
      </Link>
    </div>
  );
}
