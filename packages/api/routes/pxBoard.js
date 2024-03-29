let PxBoard = require('../model/pxBoardModel');

function getAllPxBoards(req, res) {
   
    PxBoard.find().then(pxBoards => {
       
        res.send(pxBoards);
    }).catch(err => {
        res.status(500).send(err);
    });
}



module.exports = {getAllPxBoards};