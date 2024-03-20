const { check } = require("express-validator")

const name = check("name")
  .notEmpty({ ignore_whitespace: true })
  .withMessage("El nombre no puede estar vacío")
  .isLength({ min: 1, max: 20 })
  .withMessage("El nombre debe tener entre 1 y 20 caracteres")

const lastname = check("lastname")
  .notEmpty({ ignore_whitespace: true })
  .withMessage("El apellido no puede estar vacío")
  .isLength({ min: 1, max: 20 })
  .withMessage("El apellido debe tener entre 1 y 20 caracteres")

const password = check("password")
  .notEmpty({ ignore_whitespace: true })
  .withMessage("La contraseña es obligatoria")
  // .isLength({ min: 8 })
  // .withMessage("La contraseña debe tener al menos 8 caracteres")
  .isStrongPassword()
  .withMessage("La contraseña debe cumplir las condiciones de seguridad, al menos una mínuscula, una mayúscula, un número y un símbolo")

const email = check("email")
  .notEmpty({ ignore_whitespace: true })
  .withMessage("El mail es obligatorio")
  .isEmail()
  .withMessage("Formato incorrecto de correo electrónico")

module.exports = { name, lastname, password, email }


// name lastname document email phone password role statusUser 