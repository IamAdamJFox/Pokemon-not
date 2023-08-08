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
  const [battleLog, setBattleLog] = useState([]); // New battle log state

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
    const damageDone = Math.floor(selectedMove.power * (Math.random() + 0.5));

    setBattleLog((prevLog) => [...prevLog, { source: "enemy", move: "Tackle", damage: damageDone }]);

    setPlayerHP((prevHP) => Math.max(prevHP - damageDone, 0));

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
    let newEnemyHP = Math.max(enemyPokemon.currentHp - damageDone, 0);
    setPlayerIsAttacking(true);
    setTimeout(() => setPlayerIsAttacking(false), 500);

    setBattleLog((prevLog) => [...prevLog, { source: "player", move, damage: damageDone }]);

    setEnemyPokemon((prevEnemyPokemon) => ({
      ...prevEnemyPokemon,
      currentHp: newEnemyHP
    }));

    if (newEnemyHP <= 0) {
      setIsBattleOver(true);
      setShowConfetti(true); 
      setShowVictoryMessage(true);
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
    setBattleLog([]);
    setShowConfetti(false);
    setShowVictoryMessage(false);
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
            <img src={playerPokemonImage} alt={`${playerPokemonName} sprite`} className="flip-image" />
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
      <div className="battle-log-container">
        <h3 className="battle-log-title">Battle Log:</h3>
        <ul className="battle-log-list">
          {battleLog.map((entry, index) => (
            <li
              key={index}
              className={`battle-log-entry ${entry.source === "player" ? "player" : "enemy"}`}
            >
              <span className="log-source">{entry.source === "player" ? "Player" : "Enemy"}</span>{" "}
              <span className="log-action">used</span>{" "}
              <span className="log-move">{entry.move}</span>{" "}
              {entry.damage !== undefined && (
                <span className="log-damage">and dealt {entry.damage} damage.</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


