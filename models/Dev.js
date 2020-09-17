//IMPORT 
const mongoose = require ('mongoose');

//SCHEMA 

const DevSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

});

module.exports = mongoose.model('Users', DevSchema);