const cards = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

let cardsFile;

const loadFile = (req, res) => {
  const fileDir = path.join(__dirname, '../data/cards.json');
  fsPromises.readFile(fileDir, { encoding: 'utf8' })
    .then((data) => {
      cardsFile = JSON.parse(data);
      res.json(cardsFile);
    })
    .catch(() => {
      res.status(500).json({ message: `Ошибка при загрузке файла по адресу ${fileDir}` });
    });
};

cards.use(loadFile);

module.exports = cards;
