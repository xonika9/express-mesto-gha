const express = require('express');

const userRouter = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.post('/', express.json(), createUser);
userRouter.patch('/me', express.json(), updateUserProfile);
userRouter.patch('/me/avatar', express.json(), updateUserAvatar);

module.exports = userRouter;
