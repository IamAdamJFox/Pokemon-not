import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../assets/BattleScreen.css";
import ReactConfetti from "react-confetti";

const movePower = [20, 30, 40, 70];

export default function BattleScreen() {
  const location = useLocation();
  const { selectedMoves, selectedPokemon } = location.state;
  const playerPokemonImage = selectedPokemon?.sprite;
  const playerPokemonName = selectedPokemon?.name;
  const [showConfetti, setShowConfetti] = useState(false);
  const [showVictoryMessage, setShowVictoryMessage] = useState(false);
  const [playerHP, setPlayerHP] = useState(100);
  const [battleMessage, setBattleMessage] = useState("");
  const [playerIsAttacking, setPlayerIsAttacking] = useState(false);
  const [enemyIsAttacking, setEnemyIsAttacking] = useState(false);

  const [enemyPokemon, setEnemyPokemon] = useState({
    name: "Loading...",
    currentHp: 100,
    originalHp: 100,  // new field
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
          currentHp: data.stats[0].base_stat,
          originalHp: data.stats[0].base_stat,
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
    const enemyMoves = [
      { name: "Tackle", power: 30 },
      { name: "Quick Attack", power: 40 },
      { name: "Slam", power: 50 },
      { name: "Hyper Beam", power: 60 }
    ];
    setEnemyIsAttacking(true);
    setTimeout(() => setEnemyIsAttacking(false), 500);
    // Randomly select a move for the enemy
    const randomMoveIndex = Math.floor(Math.random() * enemyMoves.length);
    const selectedMove = enemyMoves[randomMoveIndex];

    const damageDealt = Math.floor(selectedMove.power * (Math.random() + 0.5));

    setBattleMessage(`Enemy ${enemyPokemon.name} used ${selectedMove.name}.`);
    setPlayerHP((prevHP) => Math.max(prevHP - damageDealt, 0));

    console.log(`Enemy used ${selectedMove.name}.`);
    if (playerHP <= 0) {
      setIsBattleOver(true);
    }
  };

  const handleMoveClick = (move, power) => {
    if (isBattleOver) {
      return;
    }
    setBattleMessage(`Your ${playerPokemonName} used ${move}!`);
    console.log(`Selected move: ${move}`);
    const damageDone = Math.floor(power * (Math.random() + 0.5));
    let newEnemyHP = Math.max(enemyPokemon.currentHp - damageDone, 0);
    setPlayerIsAttacking(true);
    setTimeout(() => setPlayerIsAttacking(false), 500);

    setEnemyPokemon(prevEnemyPokemon => ({
      ...prevEnemyPokemon,
      currentHp: newEnemyHP
    }));

    if (newEnemyHP <= 0) {
      setIsBattleOver(true);
      setBattleMessage("You Win!!! select rematch to continue!"); // This is the change!
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      setShowVictoryMessage(true);
      setTimeout(() => {
        setShowVictoryMessage(false);
      }, 2000);
    } else {
      // Delay the enemy's turn by 2 seconds so the player can read the message.
      setTimeout(() => {
        executeEnemyTurn();
      }, 2000);
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
    setBattleMessage("");
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
            <div className={playerIsAttacking ? "shake" : ""}>
              <img src={playerPokemonImage} alt={`${playerPokemonName} sprite`} className="flip-image" />
            </div>

          </div>
          <div className="hp-bar-container">
            <div className="hp-bar" style={{ width: `${(playerHP / 100) * 100}%` }}></div>
            <span className="hp-text">{playerHP}</span>
          </div>
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
            <div className={enemyIsAttacking ? "shake" : ""}>
              <img src={enemyPokemon.sprite} alt={`${enemyPokemon.name} sprite`} />
            </div>
          </div>
          <div className="hp-bar-container">
            <div className="hp-bar" style={{ width: `${(enemyPokemon.currentHp / enemyPokemon.originalHp) * 100}%` }}></div>
            <span className="hp-text">{enemyPokemon.currentHp}</span>
          </div>
          {isBattleOver && (
            <button onClick={handleRedoBattle}>Rematch</button>
          )}
        </div>
      </div>
      <div className="battle-message-box">
        {battleMessage}
      </div>
    </div>
  );
}


