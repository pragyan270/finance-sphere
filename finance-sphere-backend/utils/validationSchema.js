const Joi = require('joi');

const emailSchema = Joi.string().email().required();
const passwordSchema = Joi.string().min(4).max(100).required();

module.exports = { emailSchema, passwordSchema };
