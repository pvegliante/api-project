//my Schema//
const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    name: { type: String },
    value: { type: Number },
    total: { type: Number },
    change: { type: String },
    stockChange: { type: Number }
});

module.exports = mongoose.model('stock', StockSchema);
