const { Joi } = require('express-validation')

exports.register = {
  body: Joi.object({
    full_name: Joi.string().required(),
    username: Joi.string().min(6).required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
    dob: Joi.string().required(),
    address: Joi.string().required(),
  }),
}

exports.usernameAvail = {
  body: Joi.object({
    username: Joi.string().min(5).required(),
  }),
}