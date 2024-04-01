const express = require('express');
const articleService = require('./services/article');
const api = express.Router();

const { articleAPI } = require('./routes/article');
const { userRoutes } = require('./routes/userRoutes');

api.get('/', (req, res) => { // GET SUR localhost:8000/
	res.json(articleService.articles);
});

api.use('/articles', articleAPI);
app.use('/user', userRoutes);

module.exports = api;

