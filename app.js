const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

//  обработчик ошибки 404
const errorNotFound = (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
};

//  импортируем роуты
const users = require('./routes/users.js');
const cards = require('./routes/cards');

app.use('/users', users);
app.use('/cards', cards);
app.use(errorNotFound);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT);
