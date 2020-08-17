// Imports
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;

// Utilisation
const server = express();

//bodyParser config
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

// Routes
server.get('/', (req, res) => {
    res.setHeader('Content-Type','text/html');
    res.status(200).send('<h1>BONJOUR</h1>');
});

server.use('/api/',apiRouter);

server.listen(8080,() => console.log('server ok'));