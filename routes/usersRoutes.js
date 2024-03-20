const express = require('express')
const router = express.Router()
const usersControllers = require('../controllers/usersControllers')

const { name, lastname, email, password } = require('../utils/userValidation')
const validate = require('../middlewares/validate')

// Ruta para obtener todos los usuarios
router.get('/getAllUsers', usersControllers.getAllUsers)

// Ruta para obtener usuario por email
router.get('/getUserByEmail', usersControllers.getUserByEmail)

// Ruta para crear nuevo usuario
router.post('/newUser', [name, lastname, email, password], validate, usersControllers.createUser)

// Ruta para logeo
router.post('/loginUser', usersControllers.loginUser)

// Ruta para actualizar usuario
router.put('/updateUserById', usersControllers.updateUserById)

// Ruta para borrar usuario
router.delete('/deleteUserById', usersControllers.deleteUserById)

module.exports = router