import React from "react";
import { useParams } from "react-router-dom"; // Import useParams to access route parameters

// Sample Pokémon data
const pokemonData = [
  { id: 1, name: "Bulbasaur", moves: ["Tackle", "Vine Whip"] },
  { id: 2, name: "Charmander", moves: ["Scratch", "Ember"] },
  { id: 3, name: "Squirtle", moves: ["Tackle", "Water Gun"] },
  { id: 4, name: "Pikachu", moves: ["Quick Attack", "Thunder Shock"] },
];

export default function MoveList() {
  const { pokemonId } = useParams(); // Get the 'pokemonId' parameter from the URL

  // Find the selected Pokémon based on the ID
  const selectedPokemon = pokemonData.find(
    (pokemon) => pokemon.id === parseInt(pokemonId)
  );

  if (!selectedPokemon) {
    return <div>Pokémon not found.</div>;
  }

  return (
    <div>
      <div className="startHeader">
        <h1>Pokemon Not</h1>
      </div>
      <h2>{selectedPokemon.name}</h2>
      <h3>Moves:</h3>
      <ul>
        {selectedPokemon.moves.map((move, index) => (
          <li key={index}>{move}</li>
        ))}
      </ul>
    </div>
  );
}
