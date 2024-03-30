const mongoose = require('mongoose');
let express = require('express');
mongoose.Promise = global.Promise;

const uri = 'mongodb+srv://yassineberriri:Xo9gdcZWHYBbXZa1@cluster0.axncp8h.mongodb.net/MBDS?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(uri, { });
        console.log("Connecté à la base MongoDB pxBoard dans le cloud !");
        console.log("at URI = " + uri);
        console.log("vérifiez with http://localhost:8010/api/allpxBoards que cela fonctionne")
    } catch (err) {
        console.error('Erreur de connexion: ', err);
    }
};

module.exports = connectDB;
