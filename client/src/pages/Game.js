import React, { useState } from "react";
import { moves } from "./moves";

function attackMove(power, accuracy) {
  // Same attackMove logic as before
}

function enemyAttack() {
  // Simulate the enemy's turn here
  // You can implement your own logic to decide which move the enemy uses
  const enemyName = "Enemy"; // Set the enemy's name here
  const enemyMove = moves[Math.floor(Math.random() * moves.length)];
  const result = attackMove(enemyMove.power, enemyMove.accuracy);
  return { ...result, moveName: enemyMove.name, playerName: enemyName };
}

function checkWinner(playerHP, enemyHP) {
  if (playerHP <= 0 && enemyHP <= 0) {
    return "It's a tie!";
  } else if (playerHP <= 0) {
    return "Defeat!";
  } else if (enemyHP <= 0) {
    return "Victory!";
  }
  return null;
}

function App() {
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [isFainted, setIsFainted] = useState(false);
  const [victory, setVictory] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleAttack = () => {
    // ... Existing attack logic ...

    // Check for the winner after the player's attack
    const result = checkWinner(playerHP, enemyHP);
    if (result) {
      console.log(result);
      if (result === "Victory!") {
        setVictory(true);
      }
    } else {
      // After the player's attack, trigger the enemy's turn with a slight delay
      setTimeout(handleEnemyAttack, 1000);
    }
  };

  const handleEnemyAttack = () => {
    // ... Existing enemy attack logic ...

    // Check for the winner after the enemy's attack
    const result = checkWinner(playerHP, enemyHP);
    if (result) {
      console.log(result);
      if (result === "Defeat!") {
        setVictory(true);
      }
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleRestart = () => {
    // Reset the game
    setPlayerHP(100);
    setEnemyHP(100);
    setIsFainted(false);
    setVictory(false);
    setGameStarted(true);
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

  return (
    <div>
      <h1>Player HP: {playerHP}</h1>
      <h1>Enemy HP: {enemyHP}</h1>
      <button onClick={handleAttack}>Attack</button>
    </div>
  );
}

export default App;










  