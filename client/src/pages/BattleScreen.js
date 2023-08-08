import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../assets/BattleScreen.css";
import ReactConfetti from "react-confetti";

const movePower = [40, 60, 80, 100];

export default function BattleScreen() {
  const location = useLocation();
  const { selectedMoves, selectedPokemon } = location.state;
  const playerPokemonImage = selectedPokemon?.sprite;
  const playerPokemonName = selectedPokemon?.name;
  const [showConfetti, setShowConfetti] = useState(false);
  const [showVictoryMessage, setShowVictoryMessage] = useState(false);
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyPokemon, setEnemyPokemon] = useState({
    name: "Loading...",
    hp: 100,
    sprite: "URL_to_enemy_sprite_here",
  });

  const [isBattleOver, setIsBattleOver] = useState(false);

  const getRandomPokemonId = () => {
    return Math.floor(Math.random() * 898) + 1;
  };

  const fetchNewEnemyPokemon = () => {
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
  };

  useEffect(() => {
    fetchNewEnemyPokemon();
  }, []);

  const executeEnemyTurn = () => {
    const enemyMovePower = 30;
    const damageDealt = Math.floor(enemyMovePower * (Math.random() + 0.5));

    setPlayerHP((prevHP) => Math.max(prevHP - damageDealt, 0));

    console.log(`Enemy used Tackle. ${damageDealt} damage.`);
    if (playerHP <= 0) {
      setIsBattleOver(true);
    }
  };

  const handleMoveClick = (move, power) => {
    if (isBattleOver) {
      return;
    }
    console.log(`Selected move: ${move}`);
    const damageDone = Math.floor(power * (Math.random() + 0.5));
    let newEnemyHP = Math.max(enemyPokemon.hp - damageDone, 0); // Compute the new HP value here

    setEnemyPokemon(prevEnemyPokemon => ({
      ...prevEnemyPokemon,
      hp: newEnemyHP
    }));

    if (newEnemyHP <= 0) {
      setIsBattleOver(true);

      // Trigger confetti
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // hide confetti after 5 seconds

      // Show victory message
      setShowVictoryMessage(true);
      setTimeout(() => {
        setShowVictoryMessage(false);
      }, 2000);  // The victory message will be displayed for 2 seconds.

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
    fetchNewEnemyPokemon();
  };

  return (
    <div>
      {showVictoryMessage && <div className="victory-message">VICTORY!</div>}
      {showConfetti && <ReactConfetti width={window.innerWidth} height={window.innerHeight} />}
      <h1 className="battle-header">FIGHT</h1>

      <div className="battle-arena">
        <div className="player-section">
          <h2>Your Pokémon: {playerPokemonName}</h2>
          <div className="sprite-container">
            <img src={playerPokemonImage} alt={`${playerPokemonName} sprite`} />
          </div>
          <p>HP: {playerHP}</p>
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
          <div className="enemy-sprite-container">
            <img src={enemyPokemon.sprite} alt={`${enemyPokemon.name} sprite`} />
          </div>
          <p>HP: {enemyPokemon.hp}</p>
          {isBattleOver && (
            <button onClick={handleRedoBattle}>Redo Battle</button>
          )}
        </div>
      </div>
    </div>
  );
}


