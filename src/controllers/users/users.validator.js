const { Joi } = require('express-validation')

exports.register = {
  body: Joi.object({
    full_name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
  }),
}