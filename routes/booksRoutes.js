const express = require('express')
const router = express.Router()
const booksControllers = require('../controllers/booksControllers')
const { author, name } = require ('../utils/bookValidation')
const validate = require('../middlewares/validate')
const bookExists = require('../middlewares/validateNewBook')


// ********SOLICITUDES PARA CREAR********
router.post('/createBook', [ author, name ], validate, bookExists, booksControllers.createBook) // crear nuevo libro


// ********SOLICITUDES PARA OBTENER********
router.get('/getBooks', booksControllers.getBooks) // obtener todos los libros
router.get('/code/:id', booksControllers.getBookById) // obtener libro específico (por código interno)
router.get('/isbn/:isbn', booksControllers.getBookByIsbn) // obtener libro específico (por código ISBN)
router.get('/getBookRandom', booksControllers.getBookRandom) // obtener libro random desde openlibrary.org


// // ********SOLICITUDES PARA ACTUALIZAR********
router.put('/updateBookById/:id', booksControllers.updateBookById) // actualizar libro (por id de mongo)
router.put('/activateBookById/:id', booksControllers.activateBookById)  // reactivar libro (por id de mongo)


// // ********SOLICITUDES PARA ELIMINAR********
router.delete('/deleteBookById/:id', booksControllers.deleteBookById) // borrar libro (por id de mongo)
router.put('/logicalDeleteBookById/:id', booksControllers.logicalDeleteBookById) // borrar libro (por id de mongo)


module.exports = router;