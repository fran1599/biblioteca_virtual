const Log = require("../models/LogsModel")


// obtener todos los libros
const getAllLog = async (req, res) => {
  try {
      const logs = await Log.find()
      if (logs.length > 0) {
          res.status(200).json({ msg: "Solicitud procesada, a continuación se muestran todos los registros", logs: logs })
      } else {
          res.status(404).json({ msg: "No hay registros en la base de datos" })
      }
  } catch (error) {
      res.status(500).json({ msg: "Error al buscar registros - " + error.message })
  }
}


// Borrar todos los logs de la base de datos
const deleteAllLogs = async (req, res) => {
  try {
    await Log.deleteMany({});
    res.status(200).json({ msg: "Se han borrado todos los registros de la base de datos" });
  } catch (error) {
    res.status(500).json({ msg: "Error al borrar los registros - " + error.message });
  }
};

module.exports = { getAllLog, deleteAllLogs };