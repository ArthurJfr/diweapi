const express = require('express');
const router = express.Router();
const dosageController = require('../controllers/dosageController');
const authenticationJwt = require('../middleware/authentication');

router.post('/updateDosage',authenticationJwt,dosageController.updateDosage);
router.get('/getAllDosage',authenticationJwt,dosageController.getAllDosage);


module.exports = router;

