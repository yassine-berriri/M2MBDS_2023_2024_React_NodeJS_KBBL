const express = require('express');
const router = express.Router();
const pxBoardController = require('../controllers/pxBoardController');

router.get('/allpxBoards', pxBoardController.getAllPxBoards);
router.post('/createPxBoard', pxBoardController.postPxBoard);
router.delete('/deletePxBoard/:id', pxBoardController.deletePxBoard);
router.put('/updatePxBoard/:id', pxBoardController.updatePxBoard);
router.get('/pxBoard/:id', pxBoardController.getPxBoardById);

module.exports = router;
