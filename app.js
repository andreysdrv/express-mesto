const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/users')

const { PORT = 3000 } = process.env

const app = express()

app.use(routes)

mongoose.connect('mongodb+srv://andrew:1q2w3e4r@cluster0.geo5c.mongodb.net/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

app.listen(PORT, () => {
  console.log('ЧЕ КАК')
})