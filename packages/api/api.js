const express = require('express');
const articleService = require('./services/article');
const api = express.Router();

const { articleAPI } = require('./routes/article');

api.get('/', (req, res) => { // GET SUR localhost:8000/
	res.json(articleService.articles);
});

api.use('/articles', articleAPI);

module.exports = api;
