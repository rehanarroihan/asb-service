const { Joi } = require('express-validation')

exports.login = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    aw: Joi.string().required(),
  }),
}

exports.register = {
  body: Joi.object({
    full_name: Joi.string().required(),
  }),
}