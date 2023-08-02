const router = require('express').Router();
const { getPokemonInfo } = require('../controllers/pokemon-controller');

router.route('/:id').get(getPokemonInfo);

module.exports = router;