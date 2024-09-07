const mongoose = require('mongoose');
const Schema =mongoose.Schema

const TourSchema = new Schema({
    tourname: {
        type: String,
        required: true,
        unique: true
    },
    price_G: {
        type: String
    },
    price_B: {
        type: String
    },
    intro: {
        type: String
    },
    pic: {
        type: String
    },
    pic1: {
        type: String
    },
    pic2: {
        type: String
    },
    pic3: {
        type: String
    },
    pic4: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('tours', TourSchema)