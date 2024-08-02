const express = require('express')
const AuthRoute = express.Router()
const AuthController = require('../controller/AuthController')


AuthRoute
.post('/register',AuthController.register)
.post('/login',AuthController.userLogin)


module.exports = AuthRoute