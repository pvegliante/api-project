//my Schema//

const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  name: { type: String },
  value: { type: Number },
  total: { type: Number },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('stock', StockSchema);
