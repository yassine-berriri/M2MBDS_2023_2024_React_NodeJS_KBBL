const PxBoard = require('../models/pxBoardModel');

function getAllPxBoards(req, res) {
   
    PxBoard.find().then(pxBoards => {
       
        res.send(pxBoards);
    }).catch(err => {
        res.status(500).send(err);
    });
}


async function postPxBoard(req, res) {

    console.log("reqreqreq", req.body.userId);
    const pxBoard = new PxBoard({
        id: req.body.id,
        userId :req.body.userId,
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

/////// pixel Fonction ///////

async function addPixel(req, res) {
    try {
        const pxBoardId = req.params.id;
        const { x, y, color } = req.body;
        const userId= req.body.userId;
        const pxBoard = await PxBoard.findById(pxBoardId);
        if (!pxBoard) {
            return res.status(404).send({ message: 'PxBoard not found' });
        }

        console.log("ffffffffffffffffffffff");

        // Ajouter le nouveau pixel au tableau
        pxBoard.pixels.push({userId,x, y, color, history: [{ color, modifiedAt: new Date() }] }); // Ajoute l'historique initial du pixel

        const updatedPxBoard = await pxBoard.save();
        res.send({ message: 'Pixel added', pxBoard: updatedPxBoard });
    } catch (err) {
        res.status(500).send(err);
    }
}

async function updatePixel(req, res) {
    try {
        const pxBoardId = req.params.id;
        const {  x, y, color } = req.body; // Exemple d'utilisation du corps de la requête pour transporter les données
        const pxBoard = await PxBoard.findById(pxBoardId);
        console.log("pxBoard", pxBoard);
        console.log("pxBoardId", pxBoardId);

        if (!pxBoard) {
            return res.status(404).send({ message: 'PxBoard not found' });
        }

        // Trouver et mettre à jour le pixel
        const pixelIndex = pxBoard.pixels.findIndex(pixel => pixel.x === x && pixel.y === y);
        if (pixelIndex === -1) {
            return res.status(404).send({ message: 'Pixel not found' });
        }

        // Mettre à jour la couleur et ajouter à l'historique
        pxBoard.pixels[pixelIndex].color = color;
        pxBoard.pixels[pixelIndex].history.push({ color, modifiedAt: new Date() });

        const updatedPxBoard = await pxBoard.save();
        res.send({ message: 'Pixel updated', pxBoard: updatedPxBoard });
    } catch (err) {
        res.status(500).send(err);
    }
}

async function deletePixel(req, res) {
    try {
        const pxBoardId = req.params.pxBoardId; // Assurez-vous que l'ID du PxBoard est passé dans l'URL
        const { x, y } = req.body; // Les coordonnées du pixel à supprimer sont passées dans le corps de la requête

        // Trouver le PxBoard contenant le pixel
        const pxBoard = await PxBoard.findById(pxBoardId);

        if (!pxBoard) {
            return res.status(404).send({ message: 'PxBoard not found' });
        }

        // Filtrer les pixels pour exclure celui à supprimer
        const updatedPixels = pxBoard.pixels.filter(pixel => !(pixel.x === x && pixel.y === y));

        // Mettre à jour les pixels du PxBoard
        pxBoard.pixels = updatedPixels;

        const updatedPxBoard = await pxBoard.save();
        res.send({ message: 'Pixel deleted successfully', pxBoard: updatedPxBoard });
    } catch (err) {
        res.status(500).send({ message: 'Failed to delete pixel', error: err });
    }
}

async function countPixelsCreatedByUser(req, res) {
    try {
        const userId = req.params.userId; 
        const pixelBoards = await PxBoard.find({ userId: userId }); 

        let count = 0;

        pixelBoards.forEach(board => {
          board.pixels.forEach(pixel => {
            if (pixel.userId === userId) {
              count++;
            }
          });
        });
        res.json({ count: count }); // Sending count as JSON object
    } catch (error) {
      console.error('Error counting pixels:', error);
      throw error;
    }
}

  
  
  
  
module.exports = { getAllPxBoards, postPxBoard, deletePxBoard, updatePxBoard, getPxBoardById,updatePixel,addPixel,deletePixel,countPixelsCreatedByUser};


