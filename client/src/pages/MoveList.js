import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_POKEMON_BY_ID, GET_MOVES_BY_POKEMON_ID } from "../utils/queries";
import { ADD_SELECTED_MOVE } from "../utils/mutations";
import '../assets/movelist.css';

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
  const handleMoveRemove = (moveToRemove) => {
    const updatedMoves = selectedMoves.filter(move => move !== moveToRemove);
    setSelectedMoves(updatedMoves);
  }

  if (loadingPokemon || loadingMoves) {
    return <div>Loading...</div>;
  }

  if (errorPokemon || errorMoves) {
    return <div>Error: {errorPokemon?.message || errorMoves?.message}</div>;
  }

  const selectedPokemon = dataPokemon.getPokemonById;

  return (
    <div className="center-container">
      <h1 className="move-header">Pokemon Not</h1>
      <h2>Choose 4 Moves</h2>
      <div className="selected-pokemon">
        <h2>{selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}</h2>
        <img src={selectedPokemon.image} alt={selectedPokemon.name} />
      </div>
      <div className="move-list-container">
        <div className="moves-wrapper">
          <div className="moves-container-header">
            <h3 className="move-select-title">All Moves:</h3>
          </div>
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
        </div>
        <div className="selected-moves-wrapper">
          <div className="selected-moves-header">
            <h3 className="move-select-title">Your Moves:</h3>
          </div>
          <div className="selected-moves-container">
            {selectedMoves.map((move, index) => (
              <div key={index} className="selected-move">
                <button className="selected-move-button">
                  {move}
                </button>
                <button
                  className="remove-move-button"
                  onClick={() => handleMoveRemove(move)}
                >
                  -
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="attack-button-container">
        {selectedMoves.length === 4 ? (
          <button
            className={`button attack-button ${
              selectedMoves.length === 4 ? "attack-button-enabled" : "attack-button-disabled"
            }`}
            onClick={() => {
              navigate("/Attack", {
                state: {
                  selectedMoves,
                  selectedPokemonSprite: selectedPokemon.image,
                  selectedPokemonName: selectedPokemon.name,
                },
              });
            }}
            disabled={selectedMoves.length !== 4}
          >
            Attack
          </button>
        ) : (
          <button className="button attack-button-disabled" disabled>
            Attack
          </button>
        )}
      </div>
    </div>
  );
}