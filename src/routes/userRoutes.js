const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authentication = require('../middleware/authentication');

//router.post('/test', userController.test, authenticationJwt);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/linkto', userController.linkToPro);



module.exports = router;




