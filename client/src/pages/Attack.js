import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { SAVE_CURRENT_POKEMON } from '../utils/queries';
import '../assets/attack.css'; // Assuming you have an attack.css file for styling

export default function Attack() {
  const location = useLocation();
  const navigate = useNavigate();
  const [saveCurrentPokemon, { data, loading, error }] = useMutation(SAVE_CURRENT_POKEMON);
  const { selectedMoves, selectedPokemonSprite, selectedPokemonName } = location.state;

  const handleSave = async () => {
    try {
      const { data } = await saveCurrentPokemon({
        variables: {
          input: {
            name: selectedPokemonName,
            sprite: selectedPokemonSprite,
            moves: selectedMoves
          }
        }
      });
      console.log("Saved data:", data);
      // Handle any other post-save actions
    } catch (err) {
      console.error("Error saving:", err);
    }
  };

  const handleStartBattle = () => {
    navigate("/Battle", {
      state: {
        selectedMoves,
        selectedPokemon: {
          name: selectedPokemonName,
          sprite: selectedPokemonSprite
        }
      }
    });
  };
  
  return (
    <div className="attack-container">
      <div className="selected-pokemon">
        <h2>{selectedPokemonName}</h2>
        <img src={selectedPokemonSprite} alt={selectedPokemonName} />
      </div>
      <h2 className="displayed-moves-container">Selected Moves:</h2>
      <ul className="displayed-moves-list">
        {selectedMoves.map((move, index) => (
          <li key={index} className="displayed-move">{move}</li>
        ))}
      </ul>
      <div className="attack-button-container">
        <button className="attack-button" onClick={handleStartBattle}>Start Battle</button>
        <button className="attack-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}