//bulbasaur
fetch ('https://pokeapi.co/api/v2/pokemon/1/',{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
 
}).then(response => {return response.json()})
.then(data => console.log(data))
.catch(error => console.log('Error:', error));
//charmander
fetch ('https://pokeapi.co/api/v2/pokemon/4/',{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
 
}).then(response => {return response.json()})
.then(data => console.log(data))
.catch(error => console.log('Error:', error));
//squirle
fetch ('https://pokeapi.co/api/v2/pokemon/7/',{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
}).then(response => {return response.json()})
.then(data => console.log(data))
.catch(error => console.log('Error:', error));
//pikachu
fetch ('https://pokeapi.co/api/v2/pokemon/25/',{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
}).then(response => {return response.json()})
.then(data => console.log(data))
.catch(error => console.log('Error:', error));
// move api fetch request
fetch ('https://pokeapi.co/api/v2/move/1/',{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
 
}).then(response => {return response.json()})
.then(data => console.log(data))
.catch(error => console.log('Error:', error));

// Function to fetch Bulbasaur's stats
async function fetchBulbasaurStats() {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/1/';
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.stats;
    } catch (error) {
      console.error('Error fetching Bulbasaur stats:', error);
      return null;
    }
  }
  
  // Example usage
  fetchBulbasaurStats()
    .then(stats => {
      if (stats) {
        // Accessing the stats
        console.log("HP:", stats[0].base_stat);
        console.log("Attack:", stats[1].base_stat);
        console.log("Defense:", stats[2].base_stat);
        console.log("Special Attack:", stats[3].base_stat);
        console.log("Special Defense:", stats[4].base_stat);
        console.log("Speed:", stats[5].base_stat);
      }
    });

    const moveName = 'pound'; // Replace with the move name you want to fetch

// Function to fetch move data from the API
async function fetchMoveData(moveName) {
  const apiUrl = `https://pokeapi.co/api/v2/move/${moveName}/`;

  try {
    const response = await fetch(apiUrl);
    const moveData = await response.json();
    return moveData;
  } catch (error) {
    console.error('Error fetching move data:', error);
    return null;
  }
}

// Function to extract accuracy, power, and type from the move data
function extractMoveInfo(moveData) {
  if (!moveData) {
    console.error('Move data is null or undefined.');
    return null;
  }

  const accuracy = moveData.accuracy;
  const power = moveData.power;
  const moveType = moveData.type.name;

  return { accuracy, power, moveType };
}

// Usage
(async () => {
  const moveName = 'pound';
  const moveData = await fetchMoveData(moveName);
  if (moveData) {
    const { accuracy, power, moveType } = extractMoveInfo(moveData);
    console.log("Accuracy:", accuracy);
    console.log("Power:", power);
    console.log("Type:", moveType);
  }
})();

  



