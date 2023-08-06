import React, { useState, useEffect } from "react";
import { moves } from "../pages/MoveList";

function attackMove(power, accuracy) {
  const randomAccuracy = Math.floor(Math.random() * 100) + 1;
  const attackHits = randomAccuracy <= accuracy;

  if (attackHits) {
    const damageDealt = Math.floor(power * (Math.random() + 0.5));
    return {
      hit: true,
      damage: damageDealt,
    };
  } else {
    return {
      hit: false,
    };
  }
}

function enemyAttack() {
  const enemyName = "Enemy";
  const enemyMove = moves[Math.floor(Math.random() * moves.length)];
  const result = attackMove(enemyMove.power, enemyMove.accuracy);

  return { ...result, moveName: enemyMove.name, playerName: enemyName };
}

function App() {
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [isFainted, setIsFainted] = useState(false);
  const [victory, setVictory] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerSelectedMove, setPlayerSelectedMove] = useState(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);

  useEffect(() => {
    setGameStarted(true);
    setIsPlayerTurn(Math.random() < 0.5);
  }, []);

  useEffect(() => {
    if (playerHP <= 0 || enemyHP <= 0) {
      const result = checkWinner(playerHP, enemyHP);
      console.log(result);
      if (result === "Victory!") {
        setVictory(true);
      } else if (result === "Defeat!") {
        setIsFainted(true);
      }
    }
  }, [playerHP, enemyHP]);

  const attackMove = (power, accuracy) => {
    const randomAccuracy = Math.floor(Math.random() * 100) + 1;
    const attackHits = randomAccuracy <= accuracy;

    if (attackHits) {
      const damageDealt = Math.floor(power * (Math.random() + 0.5));
      return {
        hit: true,
        damage: damageDealt,
      };
    } else {
      return {
        hit: false,
      };
    }
  };

  const handlePlayerMoveSelection = (move) => {
    setPlayerSelectedMove(move);
  };

  const handleAttack = () => {
    if (isPlayerTurn && !isFainted && !victory) {
      if (playerSelectedMove) {
        performPlayerAttack();
      } else {
        console.log("Please select a move!");
      }
    }
  };

  const performPlayerAttack = () => {
    const playerMove = moves.find((move) => move.name === playerSelectedMove);
    const playerResult = attackMove(playerMove.power, playerMove.accuracy);

    if (playerResult.hit) {
      setEnemyHP((prevHP) => prevHP - playerResult.damage);
    }
  };

  const checkWinner = (playerHP, enemyHP) => {
    if (playerHP <= 0 && enemyHP <= 0) {
      return "It's a tie!";
    } else if (playerHP <= 0) {
      return "Defeat!";
    } else if (enemyHP <= 0) {
      return "Victory!";
    }
    return null;
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleRestart = () => {
    setPlayerHP(100);
    setEnemyHP(100);
    setIsFainted(false);
    setVictory(false);
    setGameStarted(true);
    setPlayerSelectedMove(null);
    setIsPlayerTurn(Math.random() < 0.5);
  };

  if (!gameStarted) {
    return (
      <div>
        <h1>Click the button to start the game!</h1>
        <button onClick={handleStartGame}>Start Game</button>
      </div>
    );
  }

  if (victory) {
    return (
      <div>
        <h1>{victory}</h1>
        <button onClick={handleRestart}>Restart</button>
      </div>
    );
  }

  if (isFainted) {
    return (
      <div>
        <h1>{checkWinner(playerHP, enemyHP)}</h1>
        <button onClick={handleRestart}>Restart</button>
      </div>
    );
  }

  if (!isPlayerTurn) {
    return (
      <div>
        <h1>Player HP: {playerHP}</h1>
        <h1>Enemy HP: {enemyHP}</h1>
        <h2>Enemy is attacking...</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>Player HP: {playerHP}</h1>
      <h1>Enemy HP: {enemyHP}</h1>
      <h2>Select a Move:</h2>
      {moves.map((move) => (
        <button key={move.name} onClick={() => handlePlayerMoveSelection(move.name)}>
          {move.name}
        </button>
      ))}
      <button onClick={handleAttack}>Attack</button>
    </div>
  );
}

export default App;














  