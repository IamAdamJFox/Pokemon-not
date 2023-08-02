import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


export default function StartMenu() {
    const [selectedPokemon, setSelectedPokemon] = useState("");

    const handlePokemonSelect = (pokemon)=>{
        setSelectedPokemon(pokemon);
    };
    const handlePokemonSubmit = () => {
        if (isLoggedIn) {
            if (selectedPokemon) {
              console.log("Pokemon selected: ", selectedPokemon);
              history.push(`/MoveList/${selectedPokemon.id}`);
            } else {
              console.log("No Pokemon selected");
            }
          } else {
            // Redirect to the login page
            history.push("/login");
          }
        };

    const pokemonList = [
        {id: 1 , name: "Bulbasaur"},
        {id: 2 , name: "Charmander"},
        {id: 3 , name: "Squirle"},
        {id: 4 , name: "Pikachu"},
    ];
    return(
        <div>
            <div className="startHeader">
            <h1>Pokemon Not</h1>
            </div>
            <h2>Select your Pokemon</h2>
            <ul>
                {pokemonList.map((pokemon) => (
                    <li key={pokemon.id}>
                        <button onClick={() => handlePokemonSelect(pokemon)}>{pokemon.name}</button>
                    </li>
                ))}
            </ul>
            <div className="startBtn">
                < Link to={selectedPokemon ? `/MoveList/${selectedPokemon.id}` : "#"}>
                    <button onClick={handlePokemonSelect} disabled={!selectedPokemon}>Start</button>
                </Link>
            </div>
        </div>
    );
}