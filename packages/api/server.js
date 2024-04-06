const express = require('express');
const bodyParser = require('body-parser');
const corsMiddleware = require('./middleware/cors');
const pxBoardsRoutes = require('./routes/pxBoard');
const connectDB = require('./db');
const cors = require('cors'); // Import the cors module
const userRoutes = require('./routes/userRoutes');
const socketIo = require('socket.io');
const http = require('http');

const app = express();



connectDB()


const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"], 
        allowedHeaders: ["my-custom-header"], 
        credentials: true 
      }
});


app.use(cors({
    origin: '*', // Allow requests only from this origin
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // Allow only GET and POST requests
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept', // Allow only specified headers
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', userRoutes);

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
