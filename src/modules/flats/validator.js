const Joi = require("joi");

const flatValidation = Joi.object({
  building_id: Joi.number().integer().required(),
  flat_number: Joi.string().required(),
});

module.exports = { flatValidation };
