const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const helmet = require('helmet');

const userRouter = require('./routes/users');

const cardsRouter = require('./routes/cards');

const auth = require('./middlewares/auth');

const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const NotFound = require('./errors/NotFound');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(cookieParser());

// app.use((req, res, next) => {
//   req.user = {
//     _id: '60e57bbcd41cc522a06f1af4',
//   };

//   next();
// });

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', auth, userRouter);
app.use('/', auth, cardsRouter);
app.use('*', () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT);
