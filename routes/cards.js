const { Router } = require('express');
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardValidation, idValidation } = require('../middlewares/validate');

const cardsRouter = Router();

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', cardValidation, createCard);
cardsRouter.delete('/cards/:cardId', idValidation, deleteCard);
cardsRouter.put('/cards/:cardId/likes', idValidation, likeCard);
cardsRouter.delete('/cards/:cardId/likes', idValidation, dislikeCard);

module.exports = cardsRouter;
