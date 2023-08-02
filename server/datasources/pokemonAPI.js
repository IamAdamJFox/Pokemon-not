const axios = require('axios');

class PokemonAPI {
  constructor() {
    this.baseURL = 'https://pokeapi.co/api/v2/';
  }

  async getPokemonById(id) {
    const response = await axios.get(`${this.baseURL}pokemon/${id}`);
    return {
      pokemonId: response.data.id,
      number: response.data.order, // Adjust this field as needed
      name: response.data.name,
      type: response.data.types.map(t => t.type.name), // Map and join types
      title: response.data.name // Set the title field to the name
      // Add other fields as needed, mapping them from the response
    };
  }

  // Add other methods to interact with the API as needed
}

module.exports = PokemonAPI;