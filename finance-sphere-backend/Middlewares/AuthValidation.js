const Joi = require('joi');
const { emailSchema, passwordSchema } = require('../utils/validationSchema');


const signupSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(), // Unique to signup
    email: emailSchema,
    password: passwordSchema,
});


const loginSchema = Joi.object({
    email: emailSchema,
    password: passwordSchema,
});

module.exports = { signupSchema, loginSchema };




