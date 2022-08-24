const express = require('express');

const cardRouter = express.Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', express.json(), createCard);
cardRouter.delete('/:cardId', deleteCard);

module.exports = cardRouter;
