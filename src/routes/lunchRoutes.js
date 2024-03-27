const express = require('express');
const router = express.Router();
const lunchController = require('../controllers/lunchController');
const authenticationJwt = require('../middleware/authentication');

router.post('/updatelunch', authenticationJwt, lunchController.updateLunch);
router.get('/getAlllunch', authenticationJwt, lunchController.getAlllunch);

// faire une get
module.exports = router;