import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_POKEMON_BY_ID } from '../utils/queries';
import '../assets/startmenu.css'


export default function StartMenu() {
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await response.json();
        const fetchedPokemonList = data.results.map((pokemon, index) => ({
          id: index + 1,
          name: pokemon.name,
        }));

        // Filter the list to include only Pikachu, Charmander, Bulbasaur, and Squirtle
        const selectedPokemons = fetchedPokemonList.filter(
          (pokemon) =>
            ["pikachu", "charmander", "bulbasaur", "squirtle"].includes(pokemon.name.toLowerCase())
        );
        setPokemonList(selectedPokemons);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    }
    fetchPokemonList();
  }, []);


  const handlePokemonSelect = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handlePokemonSubmit = () => {
    if (selectedPokemon) {
      console.log("Pokemon selected: ", selectedPokemon);
      navigate(`/MoveList/${selectedPokemon.id}`);
    } else {
      console.log("No Pokemon selected");
    }
  };

  return (
    <div>
      <div className="startHeader">
        <h1>Pokemon Not</h1>
      </div>
      <h2>Select your Pokemon</h2>
      <ul className="pokemon-list">
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon-container"
            onClick={() => handlePokemonSelect(pokemon)}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.name}
            />
          </div>
        ))}
      </ul>
      <div className="startBtn">
        <Link to={selectedPokemon ? `/MoveList/${selectedPokemon.id}` : "#"}>
          <button onClick={handlePokemonSubmit} disabled={!selectedPokemon}>
            Start
          </button>
        </Link>
      </div>
    </div>
  );
}