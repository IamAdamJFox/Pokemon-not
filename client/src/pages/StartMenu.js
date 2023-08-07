import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { GET_POKEMONS_BY_IDS } from '../utils/queries';
import { SAVE_POKEMON } from '../utils/mutations';
import '../assets/startmenu.css';


export default function StartMenu() {
  const { pokemonId } = useParams(); 
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_POKEMONS_BY_IDS, {
    variables: { ids: [1, 4, 7, 25] },
  });

  console.log("data in StartMenu: ", data);

  const [savePokemon] = useMutation(SAVE_POKEMON);

  const handlePokemonSelect = (pokemon) => {
    const { __typename, ...rest } = pokemon; 
    setSelectedPokemon({
      ...rest,
      pokemonId: rest.number,
      title: rest.name
    });
  };
  const handlePokemonSubmit = async () => {
    if (selectedPokemon) {
      console.log("Navigating to MoveList with Pokemon ID:", selectedPokemon.number);
  
      try {
        await savePokemon({ variables: { input: { ...selectedPokemon } } });
        // After saving, navigate to the MoveList page with the selected Pokemon's id as parameter
        // navigate(`/moveList/${selectedPokemon.number}`);
        // for future debugging

      } catch (error) {
        console.error("Error saving Pokemon:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching Pokémon list: {error.message}</div>;
  }
  
  const pokemonList = data.getPokemonsByIds;

  
  return (
    <div>
      <div className="startHeader">
        <h1>Pokemon Not</h1>
      </div>
      <div className="selectPrompt">
        <h2>Select your Pokemon</h2>
      </div>
      <ul className="pokemon-list">
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            className={`pokemon-container ${selectedPokemon === pokemon ? "selected" : ""}`}
            onClick={() => handlePokemonSelect(pokemon)}
          >
            <img src={pokemon.image} alt={pokemon.name} className="pokemon-sprite" />
          </div>
        ))}
      </ul>
      <div className="startBtn">
        <Link to={selectedPokemon ? `/MoveList/${selectedPokemon.number}` : "#"}>
          <button onClick={handlePokemonSubmit} disabled={!selectedPokemon}>
            Start
          </button>
        </Link>
      </div>
    </div>
  );
}