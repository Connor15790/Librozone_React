const mongoose = require('mongoose');

const ShelfSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
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

const Shelf = mongoose.model('Shelf', ShelfSchema);

module.exports = Shelf;