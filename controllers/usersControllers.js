const User = require("../models/UsersModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require('dotenv').config()


//   {{{ TRAER TODOS LOS USUARIOS }}}
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({ users: users, msg: "Ok" })
  } catch (error) {
    res.status(500).json({
      users: null,
      msg: "Error al obtener usuario - " + error.message,
    })
  }
}

//   {{{ TRAER USUARIOS POR EMAIL }}}
const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.params.email,
    })
    if (user) {
      res.status(200).json({ user: user, msg: "Ok" })
    } else {
      res.status(404).json({
        user: null,
        msg: "No se ha encontrado el usuario solicitado.",
      })
    }
  } catch (error) {
    res.status(500).json({
      user: null,
      msg: "Error al obtener usuario - " + error.message,
    })
  }
}

//   {{{ LOGIN USUARIO }}}
const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      res
        .status(404)
        .json({
          user: null,
          msg: "El correo electrónico no está registrado.",
        })
    } else {
      const verification = bcrypt.compareSync(req.body.password, user.password)
      if (!verification) {
        res.status(404).json({ user: null, msg: "La clave está mal." })
      } else {
        const token = jwt.sign({
          userId: user._id,
          email: user.email
        }, 
        process.env.JWT_KEY,
        {expiresIn:2000 })
        res
          .status(200)
          .json({
            user: user.email,
            token: token,
            msg: "Inicio de sesión exitoso, sesión válida por 2000 segundos."
          })
      }
    }
  } catch (error) {
    console.log("Error al iniciar sesión", error)
    res.status(500).json({
      user: null,
      msg: "Error al iniciar sesión - " + error.message,
    })
  }
}

//   {{{{ CREAR USUARIOS }}}}
const createUser = async (req, res) => {
  try {
    const saltRounds = 10 //rondas de encriptacion
    const salt = bcrypt.genSaltSync(saltRounds) // genera algoritmo de encriptación
    const hashedPass = bcrypt.hashSync(req.body.password, salt) // Genero clave encriptada  

    const newUser = { ...req.body, password: hashedPass }

    await User.create(newUser)
    res
      .status(201)
      .json({ user: newUser, msg: "Usuario registrado exitosamente" })
  } catch (error) {
    console.log("Error al crear usuario", error)
    res.status(500).json({
      user: null,
      msg: "Error al crear el usuario - " + error.message,
    })
  }
}

//   {{{{ ACTUALIZAR USUARIO POR ID }}}}
const updateUserById = async (req, res) => {
  try {
    const user = await User.findById( req.body._id )

    if (user) {
        const updatedUser = { ...req.body}
        await User.findByIdAndUpdate(req.body._id, updatedUser )
        res.status(200).json({ msg: "Usuario actualizado con éxito", user: updatedUser })
    } else {
        res.status(404).json({ msg: "No se encontró el usuario con ese ID.", user: null })
    }
} catch (error) {
    res.status(500).json({ user: null, msg: "Error al actualizar usuario - " + error.message })
}
}

//   {{{{ ELIMINAR USUARIO POR ID }}}}
const deleteUserById = async (req, res) => {
  try {
    const user = await User.findById( req.body._id )

    if ( user ) {
        await User.findByIdAndDelete( req.body._id )
        res.status(200).json({ msg: "Usuario eliminado con éxito" })
    } else {
        res.status(404).json({ msg: "No se encontró el usuario con ese ID.", user: null })
    }
} catch (error) {
    res.status(500).json({ user: null, msg: "Error al eliminar usuario - " + error.message })
} 
}

module.exports = {
  loginUser,
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUserById,
  deleteUserById
}

