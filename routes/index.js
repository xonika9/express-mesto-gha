const express = require('express');
const { login, createUser } = require('../controllers/users');
const { NOT_FOUND } = require('../utils/ErrorCodes');
const { auth } = require('../middlewares/auth');

const router = express.Router();
const userRouter = require('./users');
const cardRouter = require('./cards');

router.use(express.json());
router.post('/signin', login);
router.post('/signup', createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: `${NOT_FOUND} - Page not found` });
});

module.exports = router;
