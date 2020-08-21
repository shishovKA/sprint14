const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) return res.status(404).send({ message: 'пользователь не найден' });
      return res.send({ data: user });
    })
    .catch(() => res.status(404).send({ message: 'пользователь не найден' }));
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: err.message }));
};

module.exports.updateUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((me) => {
      if (!me) return res.status(404).send({ message: 'пользователь не найден' });
      const { name = me.name, about = me.about } = req.body;
      return User.findByIdAndUpdate(
        userId,
        { name, about },
        {
          new: true,
          runValidators: true,
          upsert: true,
        },
      )
        .then((user) => res.send({ data: user }))
        .catch(() => res.status(400).send({ message: 'Данные не прошли валидацию' }));
    })
    .catch(() => res.status(404).send({ message: 'пользователь не найден' }));
};

module.exports.updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) return res.status(404).send({ message: 'пользователь не найден' });
      return res.send({ data: user });
    })
    .catch(() => res.status(400).send({ message: 'Пользователь не найден, или данные не валидны' }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // создадим токен
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      /* запись token в куку
      res
        .cookie('jwt', token, {
          maxAge: 604800000,
          httpOnly: true,
        })
        .end();
      */

      res.send({ token });
    })
    .catch((err) => {
      // ошибка аутентификации
      res
        .status(401)
        .send({ message: err.message });
    });
};
