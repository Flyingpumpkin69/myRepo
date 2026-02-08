const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const testController = require('../controllers/testController');

router.post('/', contactController.submitContactForm);

router.get('/test', testController.testData);

module.exports = router;
