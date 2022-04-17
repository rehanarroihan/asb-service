const { Joi } = require('express-validation')

exports.login = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  }),
}