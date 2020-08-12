const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use((err, req, res, next) => {
  if (err) {
    res.status(400).send({ message: 'bad JSON' });
  } else {
    next();
  }
});
app.use(bodyParser.urlencoded({ extended: true }));

//  обработчик ошибки 404
const errorNotFound = (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
};

//  импортируем роуты
const routesUsers = require('./routes/users.js');
const routesCards = require('./routes/cards.js');

//  временный мидлвар для авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '5f339bd5ee72fe29f46bb050',
  };
  next();
});

app.use('/users', routesUsers);
app.use('/cards', routesCards);
app.use(errorNotFound);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT);
