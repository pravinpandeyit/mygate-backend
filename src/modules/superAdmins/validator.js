const Joi = require("joi");

const updateProfileValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

const adminValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  role: Joi.string().valid("society_admin", "manager").required().messages({
    "any.only": "Role entered is not correct!",
  }),
  society_id: Joi.number().optional().messages({
    "number.base": "Society ID must be a number!",
  }),
});

module.exports = { updateProfileValidation, adminValidation };
