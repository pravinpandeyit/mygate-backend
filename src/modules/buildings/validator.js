const Joi = require("joi");

const addBuildingValidation = Joi.object({
  name: Joi.string().required(),
  society_id: Joi.number().integer().required(),
});

module.exports = { addBuildingValidation };
