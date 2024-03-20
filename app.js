const express = require('express')
const app = express()

const connect = require('./database/dbConnection')

const booksRoutes = require('./routes/booksRoutes')
const logRoutes = require('./routes/logRoutes')
const usersRoutes = require('./routes/usersRoutes')

const logRequest = require('./middlewares/logRequest')
const jwtValidate = require('./middlewares/jwtValidate')



//middleware para manejo de datos en JSON
app.use(express.json())
// middleware para logs de requests
app.use(logRequest)

app.use('/test', (req, res) => {
    res.send('<h1>Trabajo final de backend para curso de Academia Numen, FullStack</h1>')
})


app.use('/books', jwtValidate, booksRoutes)
app.use('/logs', logRoutes)
app.use('/users',usersRoutes)

connect()

module.exports = app;