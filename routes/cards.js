const router = require('express').Router();
const { getCards, createCard, delCardById } = require('../controllers/cards.js');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', delCardById);

module.exports = router;
