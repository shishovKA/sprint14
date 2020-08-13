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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
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
