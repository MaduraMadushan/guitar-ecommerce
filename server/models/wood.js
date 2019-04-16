const mongoose = require('mongoose');

const woodSChema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxLength: 100
    }
});

const Wood = mongoose.model('Wood', woodSChema);

module.exports = {Wood};