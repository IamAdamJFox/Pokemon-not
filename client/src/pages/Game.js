import React, { useState } from "react";

function attackMove(power, accuracy) {
  
}

function App() {
  const [currentHP, setCurrentHP] = useState(100);
  const [isFainted, setIsFainted] = useState(false);

  const handleAttack = () => {
    if (isFainted) {
      console.log("The entity has fainted and cannot attack.");
      return;
    }

    const result = attackMove();
    if (result.hit) {
      const damageTaken = parseFloat(result.damage);
      const newHP = Math.max(0, currentHP - damageTaken);
      setCurrentHP(newHP);

      if (newHP <= 0) {
        setIsFainted(true);
        console.log("The entity has fainted.");
      } else {
        console.log(`Attack hit! Damage dealt: ${result.damage}`);
      }
    } else {
      console.log("Attack missed!");
    }
  };

  return (
    <div>
      <h1>Current HP: {currentHP}</h1>
      <button onClick={handleAttack} disabled={isFainted}>
        Attack
      </button>
    </div>
  );
}

export default App;



  