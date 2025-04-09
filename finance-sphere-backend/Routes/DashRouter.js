const express = require('express');
const { getDashboardData } = require('../Controllers/DashController'); 
const router = express.Router();


router.get('/', getDashboardData);

module.exports = router;
