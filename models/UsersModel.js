const mongoose = require('mongoose')
const { Schema } = mongoose


const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  document: {
    type: String,
    required: true,
    unique: true
  },
  email: { // el email funciona como username
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    default: 1, // 1 = usuario común
    required: true
  },
  statusUser: {
    type: Number, // 0 = borrado lógico; 1 = activo; 2 = inactivo; 3 = en espera de validación
    default: 1,
    required: true
  }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = User
