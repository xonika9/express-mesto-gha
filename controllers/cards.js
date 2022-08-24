const Card = require('../models/card');
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../utils/ErrorCodes');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ cards }))
    .catch(() =>
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${INTERNAL_SERVER_ERROR} - Server error` }),
    );
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({
          message: `${BAD_REQUEST} - Validation error`,
        });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${INTERNAL_SERVER_ERROR} - Server error` });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(NOT_FOUND)
          .send({ message: `${NOT_FOUND} - Card not found` });
      }
      return res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({
          message: `${BAD_REQUEST} - Validation error`,
        });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${INTERNAL_SERVER_ERROR} - Server error` });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(NOT_FOUND)
          .send({ message: `${NOT_FOUND} - Card not found` });
      }
      return res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({
          message: `${BAD_REQUEST} - Validation error`,
        });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${INTERNAL_SERVER_ERROR} - Server error` });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(NOT_FOUND)
          .send({ message: `${NOT_FOUND} - Card not found` });
      }
      return res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({
          message: `${BAD_REQUEST} - Validation error`,
        });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${INTERNAL_SERVER_ERROR} - Server error` });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
