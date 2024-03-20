const logModel = require('../models/LogsModel')

const logRequest = (req, res, next) => {
  const startTime = Date.now()

  const { method, url, headers } = req

  const originalSend = res.send
  res.send = function (data) {
    const serverProcessingTime = Date.now() - startTime


    const newLog = new logModel({
      method,
      url,
      statusCode: res.statusCode,
      responseTime: serverProcessingTime,
      userAgent: headers['user-agent'],
    })

    newLog.save()
      .then(() => {
        console.log('Registro de solicitud guardado en la base de datos.')
      })
      .catch((error) => {
        console.log('Error al guardar el registro de solicitud en la base de datos:', error)
      })

    res.send = originalSend
    return res.send(data)
  }

  next()
}

module.exports = logRequest
