const express = require('express');
const { validate } = require('express-validation')

const router = express.Router();

const usersController = require('../controllers/users/users.controller')
const usersValidator = require('../controllers/users/users.validator')

const AuthHandler = require("../middleware/auth-handler");

router.post(
  '/',
  [
    AuthHandler.verifyToken,
    validate(usersValidator.register, { keyByField: true })
  ],
  usersController.create,
);

router.get(
  '/',
  AuthHandler.verifyToken,
  usersController.getAll,
);

module.exports = router;
