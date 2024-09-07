const mongoose = require('mongoose');
const Schema =mongoose.Schema

const ContactSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    message: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }

})

module.exports = mongoose.model('contacts', ContactSchema)