const axios = require('axios');

class PokemonAPI {
  constructor() {
    this.baseURL = 'https://pokeapi.co/api/v2/';
  }

  async getPokemonById(id) {
    const response = await axios.get(`${this.baseURL}pokemon/${id}`);
    // Extract abilities' ids or names from the response
    const abilitiesPromises = response.data.abilities.map(ability => {
      return this.getAbilityByIdOrName(ability.ability.name);
    });
    const abilities = await Promise.all(abilitiesPromises);

    const moves = await Promise.all(
      response.data.moves.map(move => this.getMoveByIdOrName(move.move.name))
    );
    //above code can be modified to the code below to limit the number of moves by 10.
    // const moves = await Promise.all(
    //   response.data.moves.slice(0, 10).map(move => this.getMoveByIdOrName(move.move.name))
    // );
    

    return {
      pokemonId: response.data.id, // Set to the id from the response
      number: response.data.id, // Set to the same id
      name: response.data.name,
      type: response.data.types.map(t => t.type.name), // Use an array of types instead of joining them
      title: response.data.name, // Set the title field to the name
      moves: moves.map(move => ({
        id: move.id,
        name: move.name
        // Include other fields as needed
      })),
      abilities: abilities.map(ability => ({
        id: ability.id,
        name: ability.name
        // Include other fields as needed
      })),
      // Add other fields as needed, mapping them from the response
    };
  }

  async getAbilityByIdOrName(idOrName) {
    const response = await axios.get(`${this.baseURL}ability/${idOrName}`);
    return response.data;
  }

  async getMoveByIdOrName(idOrName) {
    const response = await axios.get(`${this.baseURL}move/${idOrName}`);
    return response.data; // Modify this line to return the data structure you need
  }

  // Add other methods to interact with the API as needed
}

module.exports = PokemonAPI;