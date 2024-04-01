const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to login user
router.post('/login', userController.loginUser);

module.exports = router;