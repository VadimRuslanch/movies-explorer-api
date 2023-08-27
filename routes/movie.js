const movieRouter = require('express').Router();
const {
  getMuviesBuId,
  createCardMuvie,
  deliteCardMuvie,
} = require('../controllers/movie');
const {
  validCreateCard,
  // validCardById,
} = require('../middlewares/validation');

movieRouter.get('/', getMuviesBuId);
movieRouter.post('/', validCreateCard, createCardMuvie);
movieRouter.delete('/:id', deliteCardMuvie);

module.exports = movieRouter;
