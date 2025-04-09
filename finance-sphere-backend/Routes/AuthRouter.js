const { validateSchema } = require('../Middlewares/GenericVal');
const { signupSchema, loginSchema } = require('../Middlewares/AuthValidation');
const express = require('express');
const router = express.Router();
const { signup: signupController, login: loginController } = require('../Controllers/AuthController');



// Signup route
router.post('/signup', validateSchema(signupSchema), signupController)
// Login route
router.post('/login', validateSchema(loginSchema), loginController);

module.exports = router;
