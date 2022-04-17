const express = require('express');
const { validate } = require('express-validation')

const router = express.Router();

const authController = require('../controllers/auth/auth.controller')
const authValidator = require('../controllers/auth/auth.validator')

router.post(
  '/login',
  validate(authValidator.login, { keyByField: true }),
  authController.login,
);

module.exports = router;
