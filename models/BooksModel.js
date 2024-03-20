const mongoose = require('mongoose')
const { Schema } = mongoose

const bookSchema = new Schema({
    code: {
        type: Number,
        require: true,
        unique: true
    },
    isbn: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    editorial: {
        type: String,
        required: true
    },
    collectionBooks: {
        type: String,
    },
    inLibrary: {
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: false
    },
    registerStatus: {
        type: Number, // 0 === borrado, 1 === activo
        default: 1
    }
},
    { timestamps: true })


const Book = mongoose.model('Book', bookSchema)

module.exports = Book

