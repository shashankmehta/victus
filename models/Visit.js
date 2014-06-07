var mongoose = require('mongoose');

var Item = require('./Item');

var visitSchema = new mongoose.Schema({
  restaurant: String,
  table: String,
  users: Array,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  bill: Number,
  tip: Number,
  started_at: Number,
  ended_at: Number
});

module.exports = mongoose.model('Visit', visitSchema);
