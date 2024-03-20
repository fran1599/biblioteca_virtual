const Book = require("../models/BooksModel");

const bookExists = async (req, res, next) => {
    const { isbn,code } = req.body
    try {
        const bookForIsbn = await Book.findOne({isbn: isbn})
        const bookForCode = await Book.findOne({code: code})
        
        if(bookForIsbn) {
          res.status(400).json({msg:'El libro ya se encuentra cargado'})            
        } else if (bookForCode) {
          res.status(400).json({msg:'El código ingresado ya está cargado en el sistema, ingresar otro código'})            
        } else {
            next()
        }
    } catch(error) {
        console.log('error al chequear si existe el libro', error.message)
        res.status(500).json({msg:'error del server al chequear el libro',error: error.message})
    }
}

module.exports = bookExists