const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to login user
router.post('/login', userController.loginUser);

// Route to register a new user
router.post('/register', userController.registerUser);
module.exports = router;