const Joi = require("joi");

const updateProfileValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = { updateProfileValidation };
