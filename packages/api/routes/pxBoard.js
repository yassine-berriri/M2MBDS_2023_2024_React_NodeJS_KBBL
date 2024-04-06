const express = require('express');
const router = express.Router();
const pxBoardController = require('../controllers/pxBoardController');

router.get('/allpxBoards', pxBoardController.getAllPxBoards);
router.post('/createPxBoard', pxBoardController.postPxBoard);
router.delete('/deletePxBoard/:id', pxBoardController.deletePxBoard);
router.put('/updatePxBoard/:id', pxBoardController.updatePxBoard);
router.get('/pxBoard/:id', pxBoardController.getPxBoardById);
// supprimer un pixel
router.delete('/pxboards/:pxBoardId/pixels', pxBoardController.deletePixel);
// Ajouter un pixel
router.post('/pxboards/:id/pixels', pxBoardController.addPixel);

// Mettre à jour un pixel
router.put('/pxboards/:id/pixels', pxBoardController.updatePixel);

router.get('/pxboards/pixels/:userId', pxBoardController.countPixelsCreatedByUser);


module.exports = router;
