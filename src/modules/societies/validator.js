const Joi = require("joi");

const addSocietyValidation = Joi.object({
  name: Joi.string().max(200).required(),
  address: Joi.string().required()
});

module.exports = { addSocietyValidation };
