require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/', router);

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
