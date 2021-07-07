const User = require('../models/user')

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
}

const getUserById = (req, res) => {
  User.findById(req.params._id)
    .orFail()
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
}

const createUser = (req, res) => {
  const { name, about, avatar } = req.body

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }))
}

const updateUser = (req, res) => {
  const { name, about } = req.body
  const userId = req.user._id

  console.log(userId)

  User.findByIdAndUpdate(userId , { name, about })
    .then(user => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }))
}

const updateAvatar = (req, res) => {
  const { avatar } = req.body
  const userId = req.user._id

  User.findByIdAndUpdate(userId , { avatar })
    .then(avatar => res.send({ data: avatar }))
    .catch((err) => res.status(500).send({ message: err, qwer: userId }))
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar
}