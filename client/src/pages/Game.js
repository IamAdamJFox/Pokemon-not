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
    return "Enemy wins!";
  } else if (enemyHP <= 0) {
    return "Player wins!";
  }
  return null;
}

function App() {
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [isFainted, setIsFainted] = useState(false);

  const handleAttack = () => {
    if (isFainted) {
      console.log("The entity has fainted and cannot attack.");
      return;
    }

    // Sort player's moves by priority, higher priority moves will be executed first
    const sortedPlayerMoves = moves
      .filter((move) => move.playerName !== "Enemy")
      .sort((a, b) => a.priority - b.priority);

    // Sort enemy's moves by priority, higher priority moves will be executed first
    const sortedEnemyMoves = moves
      .filter((move) => move.playerName === "Enemy")
      .sort((a, b) => a.priority - b.priority);

    // Combine the sorted player and enemy moves into a single array
    const sortedMoves = [...sortedPlayerMoves, ...sortedEnemyMoves];

    for (const move of sortedMoves) {
      const result = attackMove(move.power, move.accuracy);

      if (result.hit) {
        const damageTaken = parseFloat(result.damage);
        const newEnemyHP = Math.max(0, enemyHP - damageTaken);
        setEnemyHP(newEnemyHP);

        if (newEnemyHP <= 0) {
          setIsFainted(true);
          console.log("The enemy has fainted.");
        } else {
          console.log(`Attack hit! Damage dealt: ${result.damage}`);
        }

        // Break the loop to only execute the first attack with the highest priority
        break;
      } else {
        console.log("Attack missed!");
      }
    }

    // Check for the winner after the player's attack
    const winner = checkWinner(playerHP, enemyHP);
    if (winner) {
      console.log(winner);
    } else {
      // After the player's attack, trigger the enemy's turn with a slight delay
      setTimeout(handleEnemyAttack, 1000);
    }
  };

  const handleEnemyAttack = () => {
    if (isFainted) {
      console.log("The enemy has fainted and cannot attack.");
      return;
    }

    const enemyResult = enemyAttack();

    if (enemyResult.hit) {
      const enemyDamageTaken = parseFloat(enemyResult.damage);
      const newPlayerHP = Math.max(0, playerHP - enemyDamageTaken);
      setPlayerHP(newPlayerHP);

      if (newPlayerHP <= 0) {
        setIsFainted(true);
        console.log("The player has fainted.");
      } else {
        console.log(
          `${enemyResult.playerName}'s ${enemyResult.moveName} hit! Damage dealt: ${enemyResult.damage}`
        );
      }
    } else {
      console.log(`${enemyResult.playerName}'s attack missed!`);
    }

    // Check for the winner after the enemy's attack
    const winner = checkWinner(playerHP, enemyHP);
    if (winner) {
      console.log(winner);
    }
  };

  return (
    <div>
      <h1>Player HP: {playerHP}</h1>
      <h1>Enemy HP: {enemyHP}</h1>
      <button onClick={handleAttack} disabled={isFainted}>
        Attack
      </button>
    </div>
  );
}

export default App;








  