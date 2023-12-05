const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const {verifyToken} = require('../middleware/Authenticate');

// Define routes for users
router.post('/create_user', usersController.createUser);
router.post('/create_manager',usersController.createManager);
router.post('/login',usersController.userLogin);
// test
router.get('/protected',verifyToken,usersController.test);

module.exports = router;
