const express = require('express');
const bodyParser = require('body-parser');
const corsMiddleware = require('./middleware/cors');
const pxBoardsRoutes = require('./routes/pxBoard');
const connectDB = require('./db');

const app = express();
connectDB();

app.use(corsMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', pxBoardsRoutes);

const port = process.env.PORT || 8010;
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
