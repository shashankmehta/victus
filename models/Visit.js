var mongoose = require('mongoose');

var visitSchema = new mongoose.Schema({
  restaurant: Number,
  table: Number,
  users: Array,
  bill: Number,
  tip: Number,
  started_at: Number,
  ended_at: Number
});

module.exports = mongoose.model('Visit', visitSchema);