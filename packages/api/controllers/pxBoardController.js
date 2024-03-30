const PxBoard = require('../models/pxBoardModel');

function getAllPxBoards(req, res) {
   
    PxBoard.find().then(pxBoards => {
       
        res.send(pxBoards);
    }).catch(err => {
        res.status(500).send(err);
    });
}


async function postPxBoard(req, res) {
    const pxBoard = new PxBoard({
        id: req.body.id,
        title: req.body.title,
        endDate: req.body.endDate,
        modificationDelai: req.body.modificationDelai,
        size: req.body.size,
        mode: req.body.mode
    });

    console.log("pxBoard à envoyer", pxBoard);

    try {
        const savedPxBoard = await pxBoard.save();
        res.send({message: `pxBoard ${savedPxBoard.title} créé !`,
            pxBoard: savedPxBoard   
    });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {getAllPxBoards, postPxBoard};