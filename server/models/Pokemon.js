const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const pokemonSchema = new Schema({
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^0\d{2}|[1-9]\d{2}$/.test(v) && parseInt(v) <= 999 && parseInt(v) >= 1;
      },
      message: props => `${props.value} is not a valid Pokémon number!`
    }
  },
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

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = pokemonSchema;
