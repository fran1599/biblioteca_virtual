const { validationResult } = require('express-validator')

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    next()
  } else {
    const extractedErrors = []
    errors
    .array().map((error) => extractedErrors.push({ [error.location] : error.msg }))

    res.status(400).json({errors: extractedErrors, msg:'error de validación'})
  }
  
}

module.exports = validate