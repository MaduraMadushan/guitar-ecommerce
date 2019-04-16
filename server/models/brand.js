const mongoose = require('mongoose');

const brandSChema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxLength: 100
    }
});

const Brand = mongoose.model('Brand', brandSChema);

module.exports = {Brand};