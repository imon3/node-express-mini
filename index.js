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
            if (userInfo) {
                res.status(201).json({
                    success: true,
                    user
                })
            } else {
                res.status(400).end()
            }

        })
        .catch(() => {
            res.status(code).json({
                success: false,
                errorMessage: 'Please provide name and bio for the user.'
            })
        })
})

// DELETE REQUEST
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db
        .remove(id)
        .then(removed => {
            if (removed) {
                res.status(204).end()
            } else {
                res.status(404).json({
                    success: false,
                    message: 'The user with the specified ID does not exist.'
                })
            }
        })
        .catch(() => {
            res.status(500).json({
                success: false,
                error: 'The user could not be removed'
            })
        })
})

// UPDATE REQUEST
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changedUser = req.body;

    db
        .update(id, changedUser)
        .then(updated => {
            if (updated) {
                res.status(200).json({
                    success: true,
                    updated
                })
            } else if (!changedUser.name || !changedUser.bio) {
                res.status(404).json({
                    success: false,
                    errorMessage: 'The user information could not be modified.'
                }).end()
            } else {
                res.status(404).json({
                    success: false,
                    message: 'The user with the specified ID does not exist.'
                })
            }
        })
        .catch(() => {
            res.status(500).json({
                success: false,
                error: 'The user information could not be modified.'
            })
        })
})

// PORT LISTENER
server.listen(5000, () => {
    console.log('server Running on http://localhost:5000')
});