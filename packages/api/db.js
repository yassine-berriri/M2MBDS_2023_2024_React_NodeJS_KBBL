
const mongoose = require('mongoose');
let express = require('express');
mongoose.Promise = global.Promise;
require('dotenv').config();
const { URL_MONGO_ATLAS, URL_Mongo_DOCKER } = process.env;


const uri = URL_MONGO_ATLAS;
//const uri = URL_Mongo_DOCKER;




    const connectDB = async () => {
        try {
            console.log("uri ="+ uri);
            await mongoose.connect(uri, { })
            console.log("Connecté à la base MongoDB pxBoard dans le cloud !");
            console.log("at URI = " + uri);
            console.log("vérifiez with http://localhost:3001/api/allpxBoards que cela fonctionne")
        } catch (err) {
            console.error('Erreur de connexion: ', err);
        }
    };

    

    module.exports = connectDB;
