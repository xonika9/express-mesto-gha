const express = require('express');

const router = express.Router();
const { login, createUser } = require('../controllers/users');
const {
  signInValidation,
  signUpValidation,
} = require('../middlewares/validation');

const router = express.Router();
const userRouter = require('./users');
const cardRouter = require('./cards');

router.use(express.json());

router.post('/signin', signInValidation, login);
router.post('/signup', signUpValidation, createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: `${NOT_FOUND} - Page not found` });
});

module.exports = router;
