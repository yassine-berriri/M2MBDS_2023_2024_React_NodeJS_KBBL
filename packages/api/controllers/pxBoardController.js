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

async function deletePxBoard(req, res) {
    try {
        const pxBoardId = req.params.id;
        const deletedPxBoard = await PxBoard.findByIdAndDelete(pxBoardId);
        if (!deletedPxBoard) {
            return res.status(404).send({ message: 'PxBoard not found' });
        }
        res.send({ message: `PxBoard ${deletedPxBoard.title} deleted`, pxBoard: deletedPxBoard });
    } catch (err) {
        res.status(500).send(err);
    }
}

async function updatePxBoard(req, res) {
    try {
        const pxBoardId = req.params.id;
        const updatedPxBoard = await PxBoard.findByIdAndUpdate(pxBoardId, req.body, { new: true });
        if (!updatedPxBoard) {
            return res.status(404).send({ message: 'PxBoard not found' });
        }
        res.send({ message: `PxBoard ${updatedPxBoard.title} updated`, pxBoard: updatedPxBoard });
    } catch (err) {
        res.status(500).send(err);
    }
}

async function getPxBoardById(req, res) {
    try {
        const pxBoardId = req.params.id;
        const pxBoard = await PxBoard.findById(pxBoardId);
        if (!pxBoard) {
            return res.status(404).send({ message: 'PxBoard not found' });
        }
        res.send(pxBoard);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { getAllPxBoards, postPxBoard, deletePxBoard, updatePxBoard, getPxBoardById };


