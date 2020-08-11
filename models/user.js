const mongoose = require('mongoose');

const validUrl = require('../scripts/validator.js');

const customValidator = [validUrl, 'Неверный формат ссылки'];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: customValidator,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
