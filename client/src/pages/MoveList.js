import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POKEMON_BY_ID, GET_MOVES_BY_POKEMON_ID } from "../utils/queries";
import { ADD_SELECTED_MOVE } from "../utils/mutations";

export default function MoveList() {
  const { pokemonId } = useParams();
  const [selectedMoves, setSelectedMoves] = useState([]);
  const navigate = useNavigate();

  const { loading: loadingPokemon, error: errorPokemon, data: dataPokemon } = useQuery(GET_POKEMON_BY_ID, {
    variables: { id: pokemonId },
  });

  const { loading: loadingMoves, error: errorMoves, data: dataMoves } = useQuery(GET_MOVES_BY_POKEMON_ID, {
    variables: { pokemonId },
  });

  const [addSelectedMove] = useMutation(ADD_SELECTED_MOVE);

  const handleMoveSelect = async (move) => {
    if (selectedMoves.length < 4 && !selectedMoves.includes(move)) {
      const updatedMoves = [...selectedMoves, move];
      setSelectedMoves(updatedMoves);
    }
  }

  if (loadingPokemon || loadingMoves) {
    return <div>Loading...</div>;
  }

  if (errorPokemon || errorMoves) {
    return <div>Error: {errorPokemon?.message || errorMoves?.message}</div>;
  }

  const selectedPokemon = dataPokemon.getPokemonById;

  return (
    <div>
      <div className="startHeader">
        <h1>Pokemon Not</h1>
      </div>
      <h2>{selectedPokemon.name}</h2>
      <div className="selected-pokemon">
        <img src={selectedPokemon.image} alt={selectedPokemon.name} />
      </div>

      <h3>All Moves:</h3>
      <div className="moves-container">
        {dataMoves.getMovesByPokemonId.slice(0, 6).map((move, index) => (
          <button
            key={index}
            className={`move-button ${selectedMoves.includes(move.name) ? "selected-move" : ""}`}
            onClick={() => handleMoveSelect(move.name)}
            disabled={selectedMoves.includes(move.name) || selectedMoves.length >= 4}
          >
            {move.name}
          </button>
        ))}
      </div>

      <h3>Selected Moves:</h3>
      <div className="selected-moves-container">
        {selectedMoves.map((move, index) => (
          <button key={index} className="selected-move-button">
            {move}
          </button>
        ))}
      </div>

      {selectedMoves.length === 4 ? (
        <button
          onClick={() => {
            navigate("/Attack", { state: { selectedMoves } });
          }}
        >
          Attack
        </button>
      ) : (
        <button disabled>Attack</button>
      )}
    </div>
  );
}
