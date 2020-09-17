// IMPORT
const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    sirene: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isAdmin : {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Company', CompanySchema);