const express = require('express');
const router = express.Router();
const pxBoardController = require('../controllers/pxBoardController');

router.get('/pxBoards', pxBoardController.getAllPxBoards);
router.post('/createPxBoard', pxBoardController.postPxBoard);

module.exports = router;
