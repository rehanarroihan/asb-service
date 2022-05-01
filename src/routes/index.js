const express = require('express')
const { validate } = require('express-validation')

const authController = require('../controllers/auth/auth.controller')
const authValidator = require('../controllers/auth/auth.validator')

const AuthHandler = require("../middleware/auth-handler");

const usersController = require('../controllers/users/users.controller')
const usersValidator = require('../controllers/users/users.validator')

const Router = express.Router()

Router.post(
  '/auth/login',
  validate(authValidator.login, { keyByField: true }),
  authController.login
);

Router.post(
  '/user',
  [
    AuthHandler.verifyToken,
    validate(usersValidator.register, { keyByField: true })
  ],
  usersController.create,
);
Router.get(
  '/users',
  AuthHandler.verifyToken,
  usersController.getAll
);
Router.post(
  '/user/username-avail', 
  [
    AuthHandler.verifyToken,
    validate(usersValidator.usernameAvail, { keyByField: true })
  ],
  usersController.usernameCheck
);
Router.get(
  '/user/roles',
  AuthHandler.verifyToken,
  usersController.roles
);
Router.delete(
  '/user',
  [
    AuthHandler.verifyToken,
    AuthHandler.isDirector,
    validate(usersValidator.delete)
  ],
  usersController.delete
);

module.exports = Router