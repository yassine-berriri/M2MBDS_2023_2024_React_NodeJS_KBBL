const express = require('express');
const router = express.Router();
const statController = require('../controllers/statBoardController');


router.get('/getstat', statController.getStats);


module.exports = router;