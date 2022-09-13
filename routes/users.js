const express = require('express');

const userRouter = express.Router();
const {
  getUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

userRouter.use(express.json());

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', updateUserProfile);
userRouter.patch('/me/avatar', updateUserAvatar);
userRouter.get('/me', getCurrentUser);

module.exports = userRouter;
