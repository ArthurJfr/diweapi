const express = require('express');
const router = express.Router();
const glucoController = require('../controllers/glucoController');
const authenticationJwt = require('../middleware/authentication');

router.post('/onscan', authenticationJwt, glucoController.onScan);
router.get('/getLastScan', authenticationJwt, glucoController.getLastScan);
router.get('/getAllScan', authenticationJwt, glucoController.getAllScan )

module.exports = router;