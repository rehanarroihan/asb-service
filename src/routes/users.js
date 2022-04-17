const express = require('express');
const { validate } = require('express-validation')

const router = express.Router();

const usersController = require('../controllers/users/users.controller')
const usersValidator = require('../controllers/users/users.validator')

router.post(
  '/',
  validate(usersValidator.register, { keyByField: true }),
  usersController.create,
);

router.get(
  '/',
  usersController.getAll,
);

module.exports = router;
