const express = require('express');
const bodyParser = require('body-parser');
const corsMiddleware = require('./middleware/cors');
const pxBoardsRoutes = require('./routes/pxBoard');
const connectDB = require('./db');
const socketIo = require('socket.io');
const http = require('http');

const app = express();


const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"], 
        allowedHeaders: ["my-custom-header"], 
        credentials: true 
      }
});
connectDB();

app.use(corsMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', pxBoardsRoutes);

// puppler db 
//const populateDB = require('./pupplerDB/puppler');

//populateDB();


const setupSocketHandlers = require('./socket/socketPxBoard');
setupSocketHandlers(io); 
  
const port = process.env.PORT || 3001;
server.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
