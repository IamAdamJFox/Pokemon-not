const { Schema } = require('mongoose');

const pokemonSchema = new Schema({
  number: [
    {
      type: String,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  
  type: {
    type: String,
    required: true,
  },
  pokemonId: {
   type: String,
   required: true,
  }

  
});

module.exports = pokemonSchema;
