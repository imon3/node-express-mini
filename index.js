// implement your API here
const express = require('express');

const db = require('./data/db');
const users = require('./data/seeds/users');

const server = express();

// MIDDLEWARE
server.use(express.json());

server.get('/', (req, res) => {
    res.send(console.log(users));
})

// GET REQUEST
server.get('/api/users', (req, res) => {
    db
        .find()
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(500).end()
            }
        })
        .catch(() => {
            res.status(500).json({
                success: false,
                error: 'The users information could not be retrieved.'
            })
        })
})

// GET INDIVIDUAL USER REQUEST
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db
        .findById(id)
        .then(user => {
            if (user) {
                res.status(200).json({
                    sucess: true,
                    user
                })
            } else {
                res.status(404).end()
            }
        })
        .catch(() => {
            res.status(404).json({
                success: false,
                error: 'The user with the specified ID does not exist.'
            })
        })
})

// POST REQUEST
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    db
        .insert(userInfo)
        .then(user => {
            res.status(200).json({
                success: true,
                user
            })
        })
        .catch((code, message) => {
            res.status(code).json({
                success: false,
                message
            })
        })
})

// PORT LISTENER
server.listen(5000, () => {
    console.log('server Running on http://localhost:5000')
});