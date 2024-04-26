const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: true,
        unique: true
    },
    class:{
        type: String,
        required: true
    },
    updateDate:{
        type: String,
        required: true
    },
    characteristics: {
        resistance: { type: Number },
        tolerance: { type: Number },
        type: { type: String },
        length: { type: mongoose.Decimal128 },
        gauge: { type: mongoose.Decimal128 },
        color: { type: String },
        alphaType: { type: String },
        betaType: { type: String },
        speed: { type: String },
    }
});

module.exports = mongoose.model('Part', partSchema);