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
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number,
        default: 0
    },
    characteristics: {
        resistance: { type: Number, default: null },
        tolerance: { type: Number, default: null },
        type: { type: String, default: null },
        length: { type: mongoose.Decimal128, default: null },
        gauge: { type: mongoose.Decimal128, default: null },
        color: { type: String, default: null },
        alphaType: { type: String, default: null },
        betaType: { type: String, default: null },
        speed: { type: String, default: null },
    }
});

// Pre-save hook to update the lastUpdatedDate field to the current time
partSchema.pre('save', function(next) {
    this.updateDate = new Date();
    next();
});

module.exports = mongoose.model('Part', partSchema);