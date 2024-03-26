const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/test', userController.test);
router.post('/register', userController.register);
router.post('/login', userController.login);



module.exports = router;




