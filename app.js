const express = require('express');
const cors = require('cors');

const app = express();

// Import Routes
const commits = require('./routes/commits');

// Middlewares
app.use(cors()); 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// use routes
app.use('/commits',commits); 

// server is on
app.get('/', async(req,res) => {
    res.status(200).send({message: 'Hello! The server is on. '});
});

// all other requests to / redirect to 404 error 
app.all("*", async(req, res) => {
    res.status(404).send({error: 'Not Found!'});
});

module.exports = app;