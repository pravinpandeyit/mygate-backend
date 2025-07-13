const Joi = require("joi");

const flatValidation = Joi.object({
  building_id: Joi.number().integer().required(),
  flat_number: Joi.string().required(),
});

const flatAssignValidation = Joi.object({
  userId: Joi.number().integer().required(),
  flatId: Joi.number().integer().required(),
  isOwner: Joi.boolean().required(),
});

module.exports = { flatValidation, flatAssignValidation };
