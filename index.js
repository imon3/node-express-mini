// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

// MIDDLEWARE
server.use(express.json());



// PORT LISTENER
server.listen(5000, () => {
    console.log('server Running on http://localhost:5000')
});