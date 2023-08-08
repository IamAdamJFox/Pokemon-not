import React, { useEffect, useState } from "react";

export default function Game({ selectedMoves }) {
  const BattleStates = {
    START: "Start",
    PLAYER_TURN: "PlayerTurn",
    ENEMY_TURN: "EnemyTurn",
    END: "End",
  };

  const moves = [
    { name: "Move 1", power: 20, accuracy: 80, priority: 2 },
    { name: "Move 2", power: 25, accuracy: 70, priority: 1 },
    // Add more moves as needed
  ];

  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [battleState, setBattleState] = useState(BattleStates.START);
  const [turn, setTurn] = useState("player"); // Use state to control the turn

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

  const enemyAttack = () => {
    const enemyMove = moves[Math.floor(Math.random() * moves.length)];
    const result = attackMove(enemyMove.power, enemyMove.accuracy);

    if (result.hit) {
      setPlayerHP((prevHP) => prevHP - result.damage);
    }

    console.log(`Enemy used ${enemyMove.name}.`);
    if (result.hit) {
      console.log(`It hit you for ${result.damage} damage.`);
    } else {
      console.log("But it missed!");
    }

    console.log(`Player HP: ${playerHP}, Enemy HP: ${enemyHP}`);

    const winner = checkWinner();
    if (winner) {
      console.log(winner);
      handleGameOver(); // Handle the end of the game
    } else {
      // After the enemy's turn, set the turn to "player" for the next iteration
      setTurn("player");
    }
  };

  const checkWinner = () => {
    if (playerHP <= 0 && enemyHP <= 0) {
      return "It's a tie!";
    } else if (playerHP <= 0) {
      return "Defeat!";
    } else if (enemyHP <= 0) {
      return "Victory!";
    }
    return null;
  };

  const handleGameOver = () => {
    console.log("The battle is over!");
    console.log("Do you want to play again? Press 'Y' to restart.");
    document.addEventListener("keypress", handleRestart);
  };

  const handleRestart = (event) => {
    if (event.key.toLowerCase() === "y") {
      console.clear(); // Clear the console before restarting
      setPlayerHP(100); // Reset player HP
      setEnemyHP(100); // Reset enemy HP
      setTurn("player"); // Reset the turn to "player"

      // Start the game again
      console.log("Let the battle begin!");
      playerTurn();
    }
  };

  const playerTurn = () => {
    // Display available moves for the player to select
    console.log("Available Moves:");
    moves.forEach((move, index) => {
      console.log(`${index + 1}. ${move.name}`);
    });

    // Prompt the player to select a move
    console.log("Select a move (1, 2, etc.):");

    // Listen for the player's input
    document.addEventListener("keypress", handlePlayerMoveSelection);
  };

  const handlePlayerMoveSelection = (event) => {
    const selectedMoveIndex = parseInt(event.key) - 1;

    if (isNaN(selectedMoveIndex) || selectedMoveIndex < 0 || selectedMoveIndex >= moves.length) {
      console.log("Invalid move selection. Please choose a valid move.");
    } else {
      const selectedMove = moves[selectedMoveIndex];
      const result = attackMove(selectedMove.power, selectedMove.accuracy);

      if (result.hit) {
        setEnemyHP((prevHP) => prevHP - result.damage);
      }

      console.log(`Player used ${selectedMove.name}.`);
      if (result.hit) {
        console.log(`It hit the enemy for ${result.damage} damage.`);
      } else {
        console.log("But it missed!");
      }

      console.log(`Player HP: ${playerHP}, Enemy HP: ${enemyHP}`);

      const winner = checkWinner();
      if (winner) {
        console.log(winner);
        handleGameOver(); // Handle the end of the game
      } else {
        // After the player's turn, set the turn to "enemy" for the next iteration
        setTurn("enemy");
        enemyTurn();
      }
    }
  };

  useEffect(() => {
    if (battleState === BattleStates.PLAYER_TURN) {
      // Player's turn
      playerTurn();
    } else if (battleState === BattleStates.ENEMY_TURN) {
      // Enemy's turn
      enemyTurn();
    }
  }, [battleState]);

  useEffect(() => {
    // Start the game
    console.log("Let the battle begin!");
    setBattleState(BattleStates.PLAYER_TURN);
  }, []);

  return null; // Using empty fragment as the correct syntax in JSX
}