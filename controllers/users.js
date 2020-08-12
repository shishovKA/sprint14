const User = require('../models/user.js');

module.exports.getFilms = (req, res) => {
  User.find({})
    .then((films) => res.send({ data: films }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createFilm = (req, res) => {
  const { title, genre, directorId } = req.body;

  User.create({ title, genre, director: directorId })

    .then((film) => res.send({ data: film }))
    .catch((err) => res.status(500).send({ message: err.message }));
};