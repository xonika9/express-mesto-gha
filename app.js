const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorHandler = require('./middlewares/error');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/', router);
app.use(errors());
app.use(errorHandler);

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
