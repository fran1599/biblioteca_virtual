const mongoose = require('mongoose')
require('dotenv').config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Además se creó una conexión a la base de datos de forma exitosa. Esperando las solicitudes...')
    } catch (error) {
        console.log('Error al conectarse a la base de datos - ', error.message)
    }
}

module.exports = connect
