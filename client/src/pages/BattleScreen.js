import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Game from "../components/Game"; // Import the Game component here
import "../assets/BattleScreen.css";

export default function BattleScreen() {
  const location = useLocation();
  const { selectedMoves, selectedPokemon } = location.state;
  const playerPokemonImage = selectedPokemon?.sprite;
  const playerPokemonName = selectedPokemon?.name;

  const [enemyPokemon, setEnemyPokemon] = useState({
    name: "Loading...",
    hp: 100,
    sprite: "URL_to_enemy_sprite_here", // Placeholder until data is fetched
  });

  const getRandomPokemonId = () => {
    return Math.floor(Math.random() * 898) + 1; // Assuming the range is 1 to 898.
  };

  useEffect(() => {
    // Fetch random pokemon for enemy pokemon
    fetch(`https://pokeapi.co/api/v2/pokemon/${getRandomPokemonId()}`)
      .then((response) => response.json())
      .then((data) => {
        setEnemyPokemon({
          name: data.name,
          hp: data.stats[0].base_stat,
          sprite: data.sprites.front_default,
        });
      })
      .catch((error) => {
        console.error("Error fetching the Pokémon data:", error);
      });
  }, []);

  const handleMoveClick = (move) => {
    // Implement the logic to trigger the player's move here
    console.log(`Selected move: ${move}`);
  };

  return (
    <div>
      <h1>Battle Screen</h1>

      <div className="player-section">
        <h2>Your Pokémon: {playerPokemonName}</h2>
        <div className="sprite-container">
          <img src={playerPokemonImage} alt={`${playerPokemonName} sprite`} />
        </div>
        {/* <p>HP: {selectedPokemon?.hp}</p> Assuming selectedPokemon has an hp property */}
        {/* will need to import moves from attack screen */}
        <p>HP: 100</p>
        {/* ... rest of player section ... */}
        <h3>Selected Moves:</h3>
        <ul>
          {selectedMoves.map((move, index) => (
            <button key={index} onClick={() => handleMoveClick(move)}>
              {move}
            </button>
          ))}
        </ul>
      </div>

      <div className="enemy-section">
        <h2>Enemy Pokémon: {enemyPokemon.name}</h2>
        <div className="sprite-container">
          <img src={enemyPokemon.sprite} alt={`${enemyPokemon.name} sprite`} />
        </div>
        <p>HP: {enemyPokemon.hp}</p>
        {/* ... rest of enemy section ... */}
      </div>
    </div>
  );
}

       



