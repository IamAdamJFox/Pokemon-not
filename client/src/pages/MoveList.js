import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation } from "@apollo/client"; // Import the useMutation hook
// import { ADD_SELECTED_MOVE } from "../utils/mutations"; // Import your mutation query

export default function MoveList() {
  const { pokemonId } = useParams();

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedMoves, setSelectedMoves] = useState([]);
  
  // Define the addSelectedMove mutation
  // const [addSelectedMove] = useMutation(ADD_SELECTED_MOVE);

  useEffect(() => {
    async function fetchSelectedPokemon() {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const data = await response.json();
        setSelectedPokemon(data);
      } catch (error) {
        console.error("Error fetching selected Pokémon:", error);
      }
    }

    fetchSelectedPokemon();
  }, [pokemonId]);

  const handleMoveSelect = async (move) => {
    if (!selectedMoves.includes(move)) {
      const updatedMoves = [...selectedMoves, move];
      setSelectedMoves(updatedMoves);

      // Save the move in the database using the addSelectedMove mutation
      // await addSelectedMove({ variables: { pokemonId: selectedPokemon.id, moveName: move } });
    }
  };

  if (!selectedPokemon) {
    return <div>Loading...</div>;
  }

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
        {selectedPokemon.moves.slice(0, 6).map((move, index) => (
          <li
            key={index}
            className={selectedMoves.includes(move.move.name) ? "selected-move" : ""}
            onClick={() => handleMoveSelect(move.move.name)}
          >
            {move.move.name}
          </li>
        ))}
      </ul>
      {selectedMoves.length === 4 ? (
        <Link to={`/Attack/${encodeURIComponent(JSON.stringify(selectedMoves))}`}>
          <button>Attack</button>
        </Link>
      ) : (
        <button disabled>Attack</button>
      )}
    </div>
  );
  }  
