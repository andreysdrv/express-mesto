const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  ERR_BAD_REQUEST, ERR_DEFAULT, ERR_NOT_FOUND, ERR_AUTH,
} = require('../errors/errors');
const Auth = require('../errors/Auth');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERR_DEFAULT).send({ message: 'Произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.params._id)
    .orFail(() => res.status(ERR_NOT_FOUND).send({ message: 'Пользователь с таким id не найден' }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'Произошла ошибка' });
      }
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(ERR_BAD_REQUEST).send({ message: 'Ошибка валидации' });
        } else if (err.name === 'CastError') {
          res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' });
        } else {
          res.status(ERR_DEFAULT).send({ message: 'Произошла ошибка' });
        }
      }));
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(() => res.status(ERR_NOT_FOUND).send({ message: 'Пользователь с таким id не найден' }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'Произошла ошибка' });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(() => res.status(ERR_NOT_FOUND).send({ message: 'Пользователь с таким id не найден' }))
    .then((avatarData) => res.send({ data: avatarData }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      } else {
        res.status(ERR_DEFAULT).send({ message: 'Произошла ошибка' });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'secret-key',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .send({ message: 'sdfasdfasfsafsa' });
    })
    .catch(() => res.status(ERR_AUTH).send({ message: 'Ошибка авторизации' }));

  // User.findOne({ email })
  //   .then((user) => {
  //     if (!user) {
  //     // не найден
  //       throw new Auth('Неправильные почта или пароль');
  //     }
  //     // найден
  //     return bcrypt.compare(password, user.password);
  //   })
  //   .then((matched) => {
  //     if (!matched) {
  //       // не совпали
  //       throw new Auth('Неправильные почта или пароль');
  //     }
  //     // совпали
  //     res.send({ message: 'Все верно!' });
  //   })
  //   .catch(() => res.send({ message: 'Произошла ошибка' }));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
