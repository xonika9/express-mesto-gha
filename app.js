const express = require('express');

const path = require('path');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

const router = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
