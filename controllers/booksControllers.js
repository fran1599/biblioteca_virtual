const Book = require("../models/BooksModel")
const axios = require("axios")

// ********************SOLICITUDES POST********************

// crear nuevo libro
const createBook = async (req, res) => {
    try {
        const newBook = req.body
        if (newBook) {
            await Book.create(newBook)
            res.status(201).json({
                msg: "El libro ha sido agregado correctamente a la biblioteca. Muchas gracias!",
                book: newBook,
            })
        } else {
            res.status(400).json({
                book: null,
                msg: "No se ha enviado ningun dato",
            })
        }
    } catch (error) {
        res.status(500).json({
            book: null,
            msg: "Error al intentar cargar el libro - " + error.message,
        })
    }
}



// ********************SOLICITUDES GET********************

// obtener libro random desde openlibrary parseando el resultado HTML de openlibrary.org/random
const getBookRandom = async (req,res) => {
  try {
    const response = await axios.get('https://openlibrary.org/random')

    const html = response.data

    const name = html.title
    const author = html.authors ? await axios.get(`https://openlibrary.org${html.authors[0].key}.json`).then(response => response.data.name) : null
    const editorial = html.publishers[0]
    const isbn = html.isbn_10  ?  html.isbn_10[0]  : null

    const bookData = {
      name,
      author,
      editorial,
      isbn
    }

    res.status(200).json({book: bookData, msg: "Libro aleatorio extraído de openlibrary"})
  } catch (error) {
    console.error(error)
  }
}



// obtener todos los libros
const getBooks = async (req, res) => {
    try {
        const books = await Book.find()
        if (books.length > 0) {
            res.status(200).json({ msg: "Solicitud procesada, a continuación se muestran todos los libros", books: books })
        } else {
            res.status(404).json({ msg: "No hay libros en la base de datos" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Error al buscar libros - " + error.message })
    }
}

// obtener libro específico (por código interno)
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)
        if (book) {
        res.status(200).json({ book: book, msg: "Estos son los datos del libro buscado por ID" })
        } else {
            res.status(404).json({ msg: "Libro no encontrado con ese ID" })
        }
    } catch (error) {
        res.status(500).json({
            book: null,
            msg: "Error al obtener libro - " + error.message,
        })
    }
}


// obtener libro específico (por código ISBN)
const getBookByIsbn = async (req, res) => {
    try {
        const book = await Book.findOne({ isbn: req.query.isbn })
        if (book) {
            res.status(200).json({ book: book, msg: "Estos son los datos del libro buscado por ISBN" })
        } else {
            res.status(404).json({ msg: `Libro con el codigo ${req.query.isbn} no encontrado` })
        }
    } catch (error) {
        res.status(500).json({
            book: null,
            msg: "Error al obtener libro - " + error.message,
        })
    }
}




// ********************SOLICITUDES PUT********************

// actualizar libro (por id de mongo)
const updateBookById = async (req, res) => {
    try {
        const book = await Book.findById( req.params.id )

        if (book) {
            const updatedBook = { ...req.body}
            await Book.findByIdAndUpdate(req.params.id, updatedBook )
            res.status(200).json({ msg: "Registro de libro actualizado con éxito", book: updatedBook })
        } else {
            res.status(404).json({ msg: "No se encontró el libro con ese código.", book: null })
        }
    } catch (error) {
        res.status(500).json({ book: null, msg: "Error al actualizar el libro - " + error.message })
    }
}

// reactivar libro eliminado lógicamente
const activateBookById = async (req, res) => {
    try {
        const book = await Book.findById( req.params.id )

        if (book) {
            await Book.findByIdAndUpdate(req.params.id, {registerStatus: 1} )
            res.status(200).json({ msg: "Libro activado nuevamente con éxito", libro: book.name })
        } else {
            res.status(404).json({ msg: "No se encontró el libro con ese código.", book: null })
        }
    } catch (error) {
        res.status(500).json({ book: null, msg: "Error al activar el libro - " + error.message })
    }
}




// ********************SOLICITUDES DELETE********************

// borrar libro (por id de mongo)
const deleteBookById = async (req, res) => {
    try {
        const book = await Book.findById({ _id: req.params.id })

        if (book) {
            await Book.findByIdAndDelete({ _id: req.params.id })
            res.status(200).json({ msg: "Libro eliminado con éxito" })
        } else {
            res.status(404).json({ msg: "No se encontró el libro con ese ID.", book: null })
        }
    } catch (error) {
        res.status(500).json({ book: null, msg: "Error al eliminar el libro - " + error.message })
    }
}

// borrado lógico de libro
const logicalDeleteBookById = async (req, res) => {
    try {
        const book = await Book.findById( req.params.id )

        if (book) {
            await Book.findByIdAndUpdate(req.params.id, {registerStatus: 0} )
            res.status(200).json({ msg: "Libro eliminado lógicamente con éxito" })
        } else {
            res.status(404).json({ msg: "No se encontró el libro con ese código.", book: null })
        }
    } catch (error) {
        res.status(500).json({ book: null, msg: "Error al eliminar el libro - " + error.message })
    }
}


module.exports = {
    createBook,
    getBooks,
    getBookByIsbn,
    getBookById,
    updateBookById,
    deleteBookById,
    logicalDeleteBookById,
    activateBookById,
    getBookRandom
}

