const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const dosageController = require('../controllers/dosageController');

const authenticationJwt = require('../middleware/authentication');

router.post('/updateMatin',authenticationJwt,dosageController.updateDosageMatin);

module.exports = router;

