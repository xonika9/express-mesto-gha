const User = require('../models/user');
const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require('../utils/ErrorCodes');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: `${INTERNAL_SERVER_ERROR} - Server error` }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .send({ message: `${NOT_FOUND} - User not found` });
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({
          message: `${BAD_REQUEST} - Validation error111`,
        });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `${INTERNAL_SERVER_ERROR} - Server error` });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
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

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .send({ message: `${NOT_FOUND} - User not found` });
      }
      return res.send({ user });
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

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .send({ message: `${NOT_FOUND} - User not found` });
      }
      return res.send({ user });
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
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
