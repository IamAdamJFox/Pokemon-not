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
        playerHPAfterAttack: Math.max(currentPlayerHP - damageDealt, 0),
      };
    } else {
      return {
        hit: false,
        playerHPAfterAttack: currentPlayerHP,
      };
    }
  };

  const calculateMovePriority = (move) => {
    // Define move priorities based on certain conditions (e.g., move power and player's HP)
    const priority = move.priority + (100 - playerHP) * 0.1;
    return priority;
  };

  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  
  const enemyMoveSelection = () => {
    // Calculate priorities for each move and sort them in descending order
    const movesWithPriorities = moves.map((move) => ({ ...move, priority: calculateMovePriority(move) }));
    movesWithPriorities.sort((a, b) => b.priority - a.priority);
  
    // Choose the move with the highest priority
    const enemyMove = movesWithPriorities[0];
    return enemyMove;
  };

  const enemyTurn = () => {
    // Disable player input during the enemy's turn
    setIsPlayerTurn(false);
    const enemyMove = enemyMoveSelection();
    const result = attackMove(enemyMove.power, enemyMove.accuracy);
    const enemyLogEntry = { source: "enemy", move: enemyMove.name, damage: result.damage };
    setBattleLog((prevLog) => [...prevLog, enemyLogEntry]);

  
    if (result.hit) {
      setPlayerHP((prevHP) => Math.max(prevHP - result.damage, 0));
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
  
      // Remove the event listener before restarting
      document.removeEventListener("keypress", handleRestart);
  
      // Start the game again
      console.log("Let the battle begin!");
      setBattleState(BattleStates.PLAYER_TURN); // Start with the player's turn
    }
  };

  const playerTurn = () => {
    if (playerHP <= 0) {
      console.log("You have no more HP. The enemy wins!");
      handleGameOver();
      return;
    }
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

  
  const enemyAttackBack = () => {
    setTimeout(() => {
      enemyTurn();
  }, 1000); // 1 second delay before enemy attacks back
};

  const handlePlayerMoveSelection = (event) => {
    if (playerHP <= 0) {
      console.log("You have no more HP. The enemy wins!");
      handleGameOver();
      return;
    }
    const selectedMoveIndex = parseInt(event.key) - 1;
    const playerLogEntry = { source: "player", move: selectedMove.name, damage: result.damage };
    setBattleLog((prevLog) => [...prevLog, playerLogEntry]);

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

  const checkWinner = () => {
    if (playerHP <= 0) {
      return "You lose! The enemy wins.";
    } else if (enemyHP <= 0) {
      return "Congratulations! You win!";
    }
    return null; // No winner yet
  };

  useEffect(() => {
    const handleBattleTurn = async () => {
      if (battleState === BattleStates.PLAYER_TURN) {
        // Player's turn
        playerTurn();
      } else if (battleState === BattleStates.ENEMY_TURN) {
        // Enemy's turn
        await enemyTurn();
        setBattleState(BattleStates.PLAYER_TURN); // Switch back to player's turn after the enemy's move
      }
    };
  
    if (battleState !== BattleStates.END) {
      handleBattleTurn();
    }
  }, [battleState]);

  useEffect(() => {
    // Start the game
    console.log("Let the battle begin!");
    setBattleState(BattleStates.PLAYER_TURN);
  }, []);

return(
  <div className="battle-log">
  <h3>Battle Log:</h3>
  <ul>
    {battleLog.map((entry, index) => (
      <li key={index}>
        {entry.source === "player" ? "Player" : "Enemy"} used {entry.move} and dealt {entry.damage} damage.
      </li>
    ))}
  </ul>
</div>
)
}