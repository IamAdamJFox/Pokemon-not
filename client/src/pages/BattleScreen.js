import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../assets/BattleScreen.css";

const movePower = [40, 60, 80, 100];

export default function BattleScreen() {
  const location = useLocation();
  const { selectedMoves, selectedPokemon } = location.state;
  const playerPokemonImage = selectedPokemon?.sprite;
  const playerPokemonName = selectedPokemon?.name;

  const [playerHP, setPlayerHP] = useState(100);
  const [enemyPokemon, setEnemyPokemon] = useState({
    name: "Loading...",
    hp: 100,
    sprite: "URL_to_enemy_sprite_here",
  });

  // adding a state to track battle status 
  const [isBattleOver, setIsBattleOver] = useState(false);

  const getRandomPokemonId = () => {
    return Math.floor(Math.random() * 898) + 1;
  };

  useEffect(() => {
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

  const executeEnemyTurn = () => {
    const enemyMovePower = 30; // Hard-coded power for the generic move
    const damageDealt = Math.floor(enemyMovePower * (Math.random() + 0.5));
    
    setPlayerHP((prevHP) => Math.max(prevHP - damageDealt, 0));
  
    console.log(`Enemy used Tackle ${damageDealt} damage.`);
    if (playerHP <= 0) {
      setIsBattleOver(true);
    }
  };
  // const executeEnemyTurn = () => {
  //   const moves = [
  //     { name: "Move 1", power: 20, accuracy: 80 },
  //     { name: "Move 2", power: 25, accuracy: 70 },
  //   ];
  //   const enemyMove = moves[Math.floor(Math.random() * moves.length)];
  //   const randomAccuracy = Math.floor(Math.random() * 100) + 1;
  //   const attackHits = randomAccuracy <= enemyMove.accuracy;
  //   if (attackHits) {
  //     const damageDealt = Math.floor(enemyMove.power * (Math.random() + 0.5));
  //     setPlayerHP((prevHP) => Math.max(prevHP - damageDealt, 0));
  //   }

  //   console.log(`Enemy used ${enemyMove.name}.`);
  //   if (attackHits) {
  //     console.log(`It hit you.`);
  //   } else {
  //     console.log("But it missed!");
  //   }

  //   if (playerHP <= 0) {
  //     setIsBattleOver(true);
  //   }
  // };

  const handleMoveClick = (move, power) => {
    if (isBattleOver) {
      return;
    }
    console.log(`Selected move: ${move}`);
    const damageDone = Math.floor(power * (Math.random() + 0.5));
    setEnemyPokemon((prevEnemyPokemon) => ({
      ...prevEnemyPokemon,
      hp: Math.max(prevEnemyPokemon.hp - damageDone, 0),
    }));
    if (enemyPokemon.hp <= 0) {
      setIsBattleOver(true);
    } else {
      executeEnemyTurn();
    }
  };

  const handleRedoBattle = () => {
    setEnemyPokemon({
      name: "Loading...",
      hp: 100,
      sprite: "URL_to_enemy_sprite_here",
    });
    setPlayerHP(100);
    setIsBattleOver(false);
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
        <p>HP: {playerHP}</p>
        {/* ... rest of player section ... */}
        <h3>Selected Moves:</h3>
        <ul>
          {selectedMoves.map((move, index) => (
            <button key={index} onClick={() => handleMoveClick(move, movePower[index])}>
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
        {isBattleOver && (
          <button onClick={handleRedoBattle}>Redo Battle</button>
        )}
      </div>
    </div>
  );
}





