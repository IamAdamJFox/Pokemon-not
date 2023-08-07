import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { SAVE_CURRENT_POKEMON } from '../utils/queries';

export default function Attack() {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation
  const [saveCurrentPokemon, { data, loading, error }] = useMutation(SAVE_CURRENT_POKEMON);
  const { selectedMoves, selectedPokemonSprite, selectedPokemonName } = location.state;
  console.log(selectedMoves);

  // Function to handle the button click
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
    <div>
      <h1>Attack Page</h1>
      <div className="selected-pokemon">
        <h2>{selectedPokemonName}</h2>
        <img src={selectedPokemonSprite} alt={selectedPokemonName} />
      </div>
      <h2>Selected Moves:</h2>
      <ul>
        {selectedMoves.map((move, index) => (
          <li key={index}>{move}</li>
        ))}
      </ul>
      <button onClick={handleStartBattle}>Start Battle</button>
      <button onClick={handleSave}>Save</button>
      {/* Rest of your Attack component code */}
    </div>
  );
}



