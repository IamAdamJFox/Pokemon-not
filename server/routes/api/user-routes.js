const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  savePokemon,
  deletePokemon,
  login,
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser)

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

// For saving and deleting Pokémon associated with a user
router.route('/me/pokemon').put(authMiddleware, savePokemon);

router.route('/pokemon/:pokemonId').delete(authMiddleware, deletePokemon);

module.exports = router;
