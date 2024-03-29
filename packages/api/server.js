let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let pxBoards = require('./routes/pxBoard');

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = 'mongodb+srv://yassineberriri:Xo9gdcZWHYBbXZa1@cluster0.axncp8h.mongodb.net/MBDS?retryWrites=true&w=majority';

const options = {
   
  };

  mongoose.connect(uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB pxBoard dans le cloud !");
    console.log("at URI = " + uri);
    console.log("vérifiez with http://localhost:8010/api/pxBoards que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

    // Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });

  // Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

const prefix = '/api';

app.route(prefix + '/pxBoards')
    .get(pxBoards.getAllPxBoards);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;