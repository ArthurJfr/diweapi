const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//router.post('/register', userController);
router.get('/test', userController.test)

module.exports = router;