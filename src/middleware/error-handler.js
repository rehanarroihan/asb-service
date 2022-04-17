const { errorResponse } = require('../helpers/general-helper');

const { ValidationError } = require('express-validation')

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return errorResponse(req, res, 'Bad Request', 400, err.details);
  }
};