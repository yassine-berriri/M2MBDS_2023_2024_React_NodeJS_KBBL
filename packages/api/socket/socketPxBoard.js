const PxBoard = require('../models/pxBoardModel.js');
let i = 0;
module.exports = function(io) {
    io.on('connection', (socket) => {
      

        // Rejoindre un tableau spécifique
        socket.on('joinBoard', async (boardId) => {
            socket.join(boardId);
            console.log(`Utilisateur a rejoint le tableau: ${boardId}`);

            // Optionnel : Envoyer l'état actuel du tableau au nouvel utilisateur
            const pxBoard = await PxBoard.findById(boardId);
            socket.emit('boardData', pxBoard);
        });

        // Quitter un tableau spécifique
        socket.on('leaveBoard', (boardId) => {
            socket.leave(boardId);
            console.log(`Utilisateur a quitté le tableau: ${boardId}`);
        });

        // Ajout d'un pixel
        socket.on('addPixel', async (data) => {
            const { userId,pxBoardId, x, y, color } = data;
            const result = await addPixel(data, io);
            if (result.success) {
                io.to(pxBoardId).emit('pixelAdded', {userId, x, y, color });
                console.log('Pixel ajouté', { userId,x, y, color });
            } else {
                socket.emit('actionFailed', 'L\'ajout du pixel a échoué');
            }
        });

        // Mise à jour d'un pixel
        socket.on('updatePixel', async (data) => {
            const { pxBoardId, x, y, color } = data;
            const result = await updatePixel(data, io);
            if (result.success) {
                io.to(pxBoardId).emit('pixelUpdated', { x, y, color });
            } else {
                socket.emit('actionFailed', 'La mise à jour du pixel a échoué');
            }
        });

        // Suppression d'un pixel
        socket.on('deletePixel', async (data) => {
            const { pxBoardId, x, y } = data;
            const result = await deletePixel(data, io);
            if (result.success) {
                io.to(pxBoardId).emit('pixelDeleted', { x, y });
            } else {
                socket.emit('actionFailed', 'La suppression du pixel a échoué');
            }
        });

        // Gérer la déconnexion
        socket.on('disconnect', () => {
            console.log('Un utilisateur s\'est déconnecté');
            // Gérer ici le nettoyage après déconnexion si nécessaire
        });
    });
};




async function addPixel( data, io) {
    try {
        const { userId, pxBoardId, x, y, color } = data;
        console.log("addPixel", data);
        const PxBoard = require('../models/pxBoardModel'); // Assurez-vous que le chemin d'accès est correct
        const pxBoard = await PxBoard.findById(pxBoardId);
      
        if (!pxBoard) {
            // Utilisez socket.emit pour envoyer un message d'erreur au client
            io.emit('error', { message: 'PxBoard not found' });
      //      console.log("PxBoard not found");
            return { success: false };
        }

        // Ajouter le nouveau pixel au tableau
        pxBoard.pixels.push({ userId, x, y, color, history: [{ color, modifiedAt: new Date() }] });

        const updatedPxBoard = await pxBoard.save();
        // Utilisez socket.emit pour envoyer une confirmation au client
        io.emit('pixelAdded', { message: 'Pixel added', pxBoard: updatedPxBoard });
        console.log("Pixel added");
        return { success: true };
    } catch (err) {
        // Utilisez socket.emit pour envoyer les détails de l'erreur au client
        io.emit('error', err);
    //    console.log("PxBoard not found 2", err);
        return { success: false };
    }
}

async function updatePixel(data, io) {
    const { pxBoardId, x, y, color } = data;
    const PxBoard = require('../models/pxBoardModel');

    try {
        console.log("Attempting to update pixel...");

        // Define the update operations for atomic execution
        const updateOps = {
            "$set": {
                "pixels.$[elem].color": color,
            },
            "$push": {
                "pixels.$[elem].history": { color, modifiedAt: new Date() }
            }
        };

        // Specify the arrayFilters to identify the correct pixel to update
        const arrayFilters = [{ "elem.x": x, "elem.y": y }];

        // Execute the update atomically using findOneAndUpdate to apply the changes
        const updatedDocument = await PxBoard.findOneAndUpdate(
            { _id: pxBoardId },
            updateOps,
            { arrayFilters: arrayFilters, new: true }
        );

        if (!updatedDocument) {
            console.log("PxBoard not found or pixel not found");
            io.emit('error', { message: 'PxBoard not found or pixel not found' });
            return { success: false };
        }

        // Emit the update to connected clients
        io.to(pxBoardId).emit('pixelUpdated', { x, y, color, history: [{ color, modifiedAt: new Date() }] });
        console.log("Pixel updated successfully.");
        return { success: true };
    } catch (err) {
        console.log("Error updating pixel:", err);
        io.emit('error', err);
        return { success: false };
    }
}

/*
async function updatePixel(data, io) {


    try {
        console.log("updatePixel");

        const { pxBoardId, x, y, color } = data;
        const PxBoard = require('../models/pxBoardModel');
        const pxBoard = await PxBoard.findById(pxBoardId);

        if (!pxBoard) {
            io.emit('error', { message: 'PxBoard not found' });
            console.log("Pixel Updated not found");
            return { success: false };
        }

        const pixelIndex = pxBoard.pixels.findIndex(pixel => pixel.x === x && pixel.y === y);
        if (pixelIndex !== -1) {
            pxBoard.pixels[pixelIndex].color = color;
            pxBoard.pixels[pixelIndex].history.push({ color, modifiedAt: new Date() });
            await pxBoard.save();
            io.to(pxBoardId).emit('pixelUpdated', { x, y, color , history: [{ color, modifiedAt: new Date() }] });
          //  console.log("Pixel Updated");

            return { success: true };

        } else {
            io.emit('error', { message: 'Pixel not found' });
            //console.log("Pixel Updated not found 2 ");
            return { success: false };
        }
    } catch (err) {
        io.emit('error', err);
        console.log("Pixel error",err);

        return { success: false };

    }
}
*/

async function deletePixel(data, io) {
    try {
        const { pxBoardId, x, y } = data;
        const PxBoard = require('../models/pxBoardModel');
        const pxBoard = await PxBoard.findById(pxBoardId);

        if (!pxBoard) {
            io.emit('error', { message: 'PxBoard not found' });
            return { success: false };
        }

        pxBoard.pixels = pxBoard.pixels.filter(pixel => !(pixel.x === x && pixel.y === y));
        await pxBoard.save();
        io.to(pxBoardId).emit('pixelDeleted', { x, y });
        //console.log("Pixel Deleted");

        return { success: true };

    } catch (err) {
        io.emit('error', { message: 'Failed to delete pixel', error: err });
        return { success: false };

    }
}



/*
async function updatePixelInDB(data) {
    try {
        const { pxBoardId, x, y, color, userId } = data;

        // Trouver le PxBoard
        const pxBoard = await PxBoard.findById(pxBoardId);
        if (!pxBoard) {
            console.log("PxBoard not found");
            return;
        }

        let pixel = pxBoard.pixels.find(p => p.x === x && p.y === y);
        if (pixel) {
            pixel.color = color;
            pixel.history.push({ color, modifiedAt: new Date(), modifiedBy: userId });
        } else {
            pxBoard.pixels.push({ x, y, color, history: [{ color, modifiedAt: new Date(), modifiedBy: userId }] });
        }

        await pxBoard.save();
        console.log('Pixel updated');
        return pixel;
    } catch (err) {
        console.error(err);
    }
}
*/




///////////////////////////////////////////////////////////////////////////////////////////////////////////:
///////////////////////////////////////////////////////////////////////////////////////////////////////////:
///////////////////////////////////////////////////////////////////////////////////////////////////////////:
///////////////////////////////////////////////////////////////////////////////////////////////////////////:
///  des example pour faciliter la vie de developpeur front de chaque evenement de socket ///
///////////////////////////////////////////////////////////////////////////////////////////////////////////:
///////////////////////////////////////////////////////////////////////////////////////////////////////////:
///////////////////////////////////////////////////////////////////////////////////////////////////////////:
///////////////////////////////////////////////////////////////////////////////////////////////////////////:

/*

import { useEffect } from 'react';
import io from 'socket.io-client';

let socket;

function App() {
  useEffect(() => {
    // Remplacez 'http://localhost:8000' par votre URL de serveur
    socket = io('http://localhost:8000');

    return () => {
      socket.disconnect();
    };
  }, []);

  // Le reste de votre composant...
}

// joint board

function joinBoard(boardId) {
  socket.emit('joinBoard', boardId);
}

// quitter board

function leaveBoard(boardId) {
  socket.emit('leaveBoard', boardId);
}

// Exemple d'envoi d'un événement pour ajouter un pixel

socket.emit('addPixel', { pxBoardId: '123', x: 5, y: 10, color: '#ff0000' });

// Envoi d'un événement pour mettre à jour un pixel

socket.emit('updatePixel', { pxBoardId: '123', x: 5, y: 10, color: '#00ff00' });

socket.emit('deletePixel', { pxBoardId: '123', x: 5, y: 10 });


Écouter les Événements du Serveur


// Écoute de la confirmation de la mise à jour du pixel
socket.on('pixelUpdated', (data) => {
    console.log('Pixel updated', data);
    // Mettre à jour l'UI pour refléter la mise à jour du pixel
});

socket.on('actionFailed', (message) => {
    console.error('Failed to update pixel', message);
    // Gérer l'échec de la mise à jour
});

// Écoute de la confirmation de la suppression du pixel
socket.on('pixelDeleted', (data) => {
    console.log('Pixel deleted', data);
    // Mettre à jour l'UI pour refléter la suppression du pixel
});

socket.on('actionFailed', (message) => {
    console.error('Failed to delete pixel', message);
    // Gérer l'échec de la suppression
});


// Écoute de la confirmation ou de l'échec de l'action
socket.on('pixelAdded', (data) => {
    // Mettre à jour l'UI pour refléter l'ajout du pixel
});

socket.on('actionFailed', (message) => {
    // Gérer l'échec de l'action
});

import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8000'); // Adaptez avec votre URL de serveur

function MyPixelBoardComponent() {
    useEffect(() => {
        socket.on('pixelAdded', (data) => {
            // Mettre à jour l'état/UI avec le nouveau pixel
        });

        socket.on('pixelUpdated', (data) => {
            // Mettre à jour l'état/UI avec le pixel mis à jour
        });

        socket.on('pixelDeleted', (data) => {
            // Mettre à jour l'état/UI pour retirer le pixel supprimé
        });

        socket.on('actionFailed', (message) => {
            // Afficher un message d'erreur ou autre feedback
        });

        return () => {
            // Nettoyer les écouteurs d'événements à la suppression du composant
            socket.off('pixelAdded');
            socket.off('pixelUpdated');
            socket.off('pixelDeleted');
            socket.off('actionFailed');
        };
    }, []);

    // Logique de rendu et gestionnaires d'événements pour l'UI...

    return <div>Mon tableau de pixels</div>;
}





*/

