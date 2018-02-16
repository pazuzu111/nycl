const express = require('express')//express
const userRoutes = express.Router()//specify router
const usersController = require('../controllers/users-controller')//use methods

//routes
userRoutes.get('/', usersController.index)
userRoutes.put('/:id', usersController.update)
userRoutes.delete('/:id', usersController.delete)

//export routes
module.exports = userRoutes
