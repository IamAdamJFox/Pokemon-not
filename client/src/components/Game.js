import React, { useEffect } from "react";

export default function Game() {
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

  let playerHP = 100;
  let enemyHP = 100;

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
    const enemyName = "Enemy";
    const enemyMove = moves[Math.floor(Math.random() * moves.length)];
    const result = attackMove(enemyMove.power, enemyMove.accuracy);

    return { ...result, moveName: enemyMove.name, playerName: enemyName, priority: enemyMove.priority };
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

  // Add a turn state variable and set it to "player" initially
  let turn = "player";

  const playerTurn = () => {
    const playerMove = moves[Math.floor(Math.random() * moves.length)];
    const result = attackMove(playerMove.power, playerMove.accuracy);

    if (result.hit) {
      enemyHP -= result.damage;
    }

    console.log(`Player used ${playerMove.name}.`);
    if (result.hit) {
      console.log(`It hit the enemy for ${result.damage} damage.`);
    } else {
      console.log("But it missed!");
    }

    console.log(`Player HP: ${playerHP}, Enemy HP: ${enemyHP}`);

    const winner = checkWinner();
    if (winner) {
      console.log(winner);
      return;
    }

    // After the player's turn, set the turn to "enemy" for the next iteration
    turn = "enemy";
    enemyTurn();
  };

  const enemyTurn = () => {
    // Simulate some delay to make it feel like the enemy is thinking or executing their move.
    setTimeout(() => {
      const enemyMove = moves[Math.floor(Math.random() * moves.length)];
      const result = attackMove(enemyMove.power, enemyMove.accuracy);

      if (result.hit) {
        playerHP -= result.damage;
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
        return;
      }

      // After the enemy's turn, set the turn to "player" for the next iteration
      turn = "player";
      playerTurn();
    }, 1000); // Add a delay of 1 second to simulate enemy's move.
  };

  const playGame = () => {
    console.log("Let the battle begin!");
    playerTurn();
  };

  // Start the game when the component mounts
  useEffect(() => {
    playGame();
  }, []);

  return null;
}

















  