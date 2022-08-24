const express = require('express');

const userRouter = express.Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.post('/', express.json(), createUser);

module.exports = userRouter;
