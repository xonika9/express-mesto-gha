const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const { NOT_FOUND } = require('./utils/ErrorCodes');

const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '63060c5782f30d3ccb231547',
  };
  next();
});

app.use('/', router);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: `${NOT_FOUND} - Page not found` });
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await app.listen(PORT);

  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
}

main();
