const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const helmet = require('helmet');

const userRouter = require('./routes/users');

const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const { ERR_NOT_FOUND } = require('./errors/errors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use((req, res, next) => {
  req.user = {
    _id: '60e57bbcd41cc522a06f1af4',
  };

  next();
});

app.use(userRouter);
app.use(cardsRouter);
app.use('*', (req, res) => {
  res.status(ERR_NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT);
