const Joi = require("joi");

const userValidation = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().required()
});

const userUpdateValidation = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().required()
});

module.exports = { userValidation, userUpdateValidation };
