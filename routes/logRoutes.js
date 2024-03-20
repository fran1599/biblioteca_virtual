const express = require('express')
const router = express.Router()
const logsControllers = require('../controllers/logsControllers')

// Ruta para obtener todos los logs
router.get('/getAllLog', logsControllers.getAllLog);

// Ruta para borrar todos los logs
router.delete('/deleteAllLog', logsControllers.deleteAllLogs);

module.exports = router