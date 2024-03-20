const { check } = require("express-validator")

const name = check("name")
  .notEmpty({ ignore_whitespace: true })
  .withMessage("El título del libro es obligatorio")

const author = check("author")
  .notEmpty({ ignore_whitespace: true })
  .withMessage("Es obligatorio ingresar el nombre de un autor. Si este no existe, puedes ingresar 'Anónimo'")


module.exports = { name, author }
