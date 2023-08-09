import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../assets/BattleScreen.css";
import ReactConfetti from "react-confetti";

const movePower = [5, 30, 40, 70];

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
  const [showGameOverMessage, setShowGameOverMessage] = useState(false);


  const getHpBarColor = (currentHp, originalHp) => {
    const percentage = (currentHp / originalHp) * 100;

    if (percentage >= 50) {
      return "green";
    } else if (percentage >= 25) {
      return "yellow";
    } else {
      return "red";
    }
  };


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
    setEnemyIsAttacking(true);

    const enemyMoves = [
      { name: "Tackle", power: 30 },
      { name: "Quick Attack", power: 40 },
      { name: "Slam", power: 50 },
      { name: "Hyper Beam", power: 60 }
    ];

    // Randomly select a move for the enemy
    const randomMoveIndex = Math.floor(Math.random() * enemyMoves.length);
    const selectedMove = enemyMoves[randomMoveIndex];
    const damageDone = Math.floor(selectedMove.power * (Math.random() + 0.5));

    setBattleLog((prevLog) => [...prevLog, { source: "enemy", move: selectedMove.name, damage: damageDone }]);

    const newPlayerHP = Math.max(playerHP - damageDone, 0);
    setPlayerHP(newPlayerHP);
    
    setTimeout(() => {
        setEnemyIsAttacking(false);
        
        if (newPlayerHP === 0) {
          setShowGameOverMessage(true);
          setIsBattleOver(true);
        }
    }, 100);
  };

  const handleMoveClick = (move, power) => {
    // If the battle is over, the enemy is currently attacking, or the player is attacking, just return.
    if (isBattleOver || enemyIsAttacking || playerIsAttacking) {
      return;
    }

    setPlayerIsAttacking(true);
    const damageDone = Math.floor(power * (Math.random() + 0.5));
    let newEnemyHP = Math.max(enemyPokemon.currentHp - damageDone, 0);

    setBattleLog((prevLog) => [...prevLog, { source: "player", move, damage: damageDone }]);

    setEnemyPokemon((prevEnemyPokemon) => ({
      ...prevEnemyPokemon,
      currentHp: newEnemyHP
    }));

    setTimeout(() => {
        setPlayerIsAttacking(false);
        
        if (newEnemyHP <= 0) {
          setIsBattleOver(true);
          setShowConfetti(true);
          setShowVictoryMessage(true);
        } else {
          // Delay the enemy's turn by 2 seconds so the player can read the message.
          setTimeout(() => {
            executeEnemyTurn();
          }, 50);
        }
    }, 2000);
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
    setShowGameOverMessage(false);

  };
  const playerHpColor = getHpBarColor(playerHP, 100);
  const enemyHpColor = getHpBarColor(enemyPokemon.currentHp, enemyPokemon.originalHp);

  return (
    <div>
      {showVictoryMessage && <div className="victory-message">VICTORY!</div>}
      {showConfetti && <ReactConfetti width={window.innerWidth} height={window.innerHeight} />}
      {showGameOverMessage && <div className="game-over-message">GAME OVER!</div>}

      <h1 className="battle-header">FIGHT</h1>

      <div className="battle-arena">
        <div className="player-section">
          <h2>Your Pokémon: {playerPokemonName}</h2>
          <div className={`sprite-container ${playerIsAttacking ? "shake" : ""}`}>
            <img src={playerPokemonImage} alt={`${playerPokemonName} sprite`} className="flip-image" />
          </div>
          <div className="hp-bar-container">
            <div className={`hp-bar ${playerHpColor}`} style={{ width: `${(playerHP / 100) * 100}%` }}></div>
            <span className="hp-text">{playerHP}</span>
          </div>
          <h3>Selected Moves:</h3>
          <ul>
            {selectedMoves.map((move, index) => (
              <button key={index} onClick={() => handleMoveClick(move, movePower[index])}
                disabled={enemyIsAttacking || playerIsAttacking || isBattleOver}>
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
            <div className={`hp-bar ${enemyHpColor}`} style={{ width: `${(enemyPokemon.currentHp / enemyPokemon.originalHp) * 100}%` }}></div>
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


