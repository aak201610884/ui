const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: Number,
  currency: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', paymentSchema);
