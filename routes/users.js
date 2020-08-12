const router = require('express').Router();
const { getUsers, getUserById, createUser } = require('../controllers/users.js');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);

module.exports = router;

/*
const users = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');

let usersFile;
let userId;
let userFound;

const loadFile = (req, res, next) => {
  const fileDir = path.join(__dirname, '../data/users.json');
  fsPromises.readFile(fileDir, { encoding: 'utf8' })
    .then((data) => {
      usersFile = JSON.parse(data);
      next();
    })
    .catch(() => {
      res.status(500).json({ message: `Ошибка при загрузке файла по адресу ${fileDir}` });
    });
};

function findById(user) {
  // eslint-disable-next-line no-underscore-dangle
  return (user._id === userId);
}

const doesUserExist = (req, res, next) => {
  userId = req.params.id;
  userFound = usersFile.find(findById);
  if (!userFound) {
    res.status(404).json({ message: `Нет пользователя с id: (${userId})` });
    return;
  }
  next();
};

const sendUser = (req, res) => {
  res.json(userFound);
};

const sendJSONFile = (req, res) => {
  res.json(usersFile);
};

users.use(loadFile);
users.get('/', sendJSONFile);
users.get('/:id', doesUserExist);
users.get('/:id', sendUser);

module.exports = users;
*/
