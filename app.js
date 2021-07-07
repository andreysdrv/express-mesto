const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRouter = require('./routes/users')
const cardsRouter = require('./routes/cards')

const { PORT = 3000 } = process.env

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.user = {
    _id: '60e57bbcd41cc522a06f1af4'
  };

  next();
});

app.use(userRouter)
app.use(cardsRouter)


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

app.listen(PORT, () => {
  console.log('FFFFFFF')
})