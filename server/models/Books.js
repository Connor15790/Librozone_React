const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    bookname: {
        type: String,
        require: true
    },
    bookauthor: {
        type: String,
        require: true
    },
    bookoverview: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    bookimage: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;