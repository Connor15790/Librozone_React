const mongoose = require('mongoose');

const UpcomingSchema = new mongoose.Schema({
    _id: {
        type: String,
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
}, { _id: false });

const Upcoming = mongoose.model('Upcoming', UpcomingSchema);

module.exports = Upcoming;