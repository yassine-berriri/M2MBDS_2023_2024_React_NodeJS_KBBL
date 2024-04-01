const express = require('express');
const bodyParser = require('body-parser');
const corsMiddleware = require('./middleware/cors');
const pxBoardsRoutes = require('./routes/pxBoard');
const connectDB = require('./db');
const cors = require('cors'); // Import the cors module
const userRoutes = require('./routes/userRoutes');

const app = express();
connectDB();

app.use(cors({
    origin: '*', // Allow requests only from this origin
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // Allow only GET and POST requests
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept', // Allow only specified headers
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', userRoutes);

app.use('/api', pxBoardsRoutes);


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
