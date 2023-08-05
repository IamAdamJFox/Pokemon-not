for (let i = 1; i <= 4; i++) {
    document.getElementById(`button${i}`).addEventListener('click', function() {
      alert(`Button ${i} clicked`);
    });
  }

  function attackMove(power, accuracy) {
    // Generate a random number between 0 and 1
    const randomValue = Math.random();
  
    if (randomValue <= accuracy) {
      // Attack hit
      const damage = power * (Math.random() + 0.5); // Add some randomness to the damage
      return { hit: true, damage: damage.toFixed(2) };
    } else {
      // Attack missed
      return { hit: false, damage: 0 };
    }
  }
  
  const power = 50;     // The power of the attack move
  const accuracy = 0.8; // The accuracy of the attack move (0 to 1)
  
  const result = attackMove(power, accuracy);
  
  if (result.hit) {
    console.log(`Attack hit! Damage dealt: ${result.damage}`);
  } else {
    console.log("Attack missed!");
  }
  
  function takeDamage(currentHP, damage) {
    const newHP = Math.max(0, currentHP - damage);
    return newHP;
  }
  
  let currentHP = 100; // Current HP before taking damage
  const damageTaken = 25; // Amount of damage taken
  
  currentHP = takeDamage(currentHP, damageTaken);
  
  console.log(`Current HP: ${currentHP}`);
  