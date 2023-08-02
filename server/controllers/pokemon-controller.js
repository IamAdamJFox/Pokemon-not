const axios = require('axios');

const getPokemonInfo = async (req, res) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`);
      return res.json(response.data);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  };
  
  module.exports = {
    getPokemonInfo,
    // Add other methods as needed
  };