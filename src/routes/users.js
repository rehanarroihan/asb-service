const express = require('express');
const { validate } = require('express-validation')

const router = express.Router();

const usersController = require('../controllers/users/users.controller')
const usersValidator = require('../controllers/users/users.validator')

router.get(
  '/',
  usersController.users,
);

module.exports = router;
