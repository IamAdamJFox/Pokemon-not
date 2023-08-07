//*TESTING* adding "Start Battle" button to take user to the next screen after user 
//customization has been completed. can be removed or modified as needed. 
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function Attack() {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for navigation

  const { selectedMoves, selectedPokemonSprite, selectedPokemonName } = location.state;
  console.log(selectedMoves);

  // Function to handle the button click
  const handleStartBattle = () => {
    navigate("/Battle", {
      state: {
        selectedMoves,
        selectedPokemon: {
          name: selectedPokemonName,
          sprite: selectedPokemonSprite
        }
      }
    });
  };
  return (
    <div>
      <h1>Attack Page</h1>
      <div className="selected-pokemon">
        <h2>{selectedPokemonName}</h2>
        <img src={selectedPokemonSprite} alt={selectedPokemonName} />
      </div>
      <h2>Selected Moves:</h2>
      <ul>
        {selectedMoves.map((move, index) => (
          <li key={index}>{move}</li>
        ))}
      </ul>
      <button onClick={handleStartBattle}>Start Battle</button>
      {/* Rest of your Attack component code */}
    </div>
  );
}
//----------------------------------current version-------------------------------------------
// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function Attack() {
//   const location = useLocation();
//   const { selectedMoves } = location.state;
//   console.log(selectedMoves);

//   return (
//     <div>
//       <h1>Attack Page</h1>
//       <h2>Selected Moves:</h2>
//       <ul>
//         {selectedMoves.map((move, index) => (
//           <li key={index}>{move}</li>
//         ))}
//       </ul>
//       {/* Rest of your Attack component code */}
//     </div>
//   );
// }




