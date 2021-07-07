const Card = require('../models/card')

const getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
}

const deleteCard = (req, res) => {
  const { userId } = req.user
  const { cardId } = req.params

  Card.findById(cardId)
    .then((card) => {
      if(card.owner._id === userId) {
        Card.findByIdAndRemove(cardId)
          .then(card => res.send(card))
      }
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
}

const createCard = (req, res) => {
  const { name, link } = req.body
  const owner = req.user._id

  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err }))
}

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then(likes => res.send({ data: likes }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
}

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then(likes => res.send({ data: likes }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard
}