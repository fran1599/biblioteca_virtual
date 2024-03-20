const mongoose = require('mongoose')
const { Schema } = mongoose


const logSchema = new Schema({
  // crear un esquema para guardar los logs de cada solicitud http que se haga en la api y su respuesta
  method: { type: String },
  url: { type: String },
  statusCode: { type: Number },
  responseTime: { type: Number },
  userAgent: { type: String },
}, { timestamps: true })

const Log = mongoose.model( 'Log', logSchema )

module.exports = Log



