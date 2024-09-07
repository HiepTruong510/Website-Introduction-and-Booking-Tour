const mongoose = require('mongoose');
const Schema =mongoose.Schema

const BookTourSchema = new Schema({
    tourname: {
        type: String,
        required: true
    },
    price: {
        type: String
    },
    totalpeson: {
        type: String
    },
    tourday: {
        type: String
    },
    tourmonth: {
        type: String
    },
    touryear: {
        type: String
    },
    personnamebook: {
        type: String
    },
    personemailbook: {
        type: String
    },
    personphonebook: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    tour_id: {
        type: Schema.Types.ObjectId,
        ref: 'tours'
    }
})

module.exports = mongoose.model('booktours', BookTourSchema)