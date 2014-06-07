var mongoose = require('mongoose');

var Item = require('./Item');
var Table = require('./Table');
var User = require('./User');
var Restaurant = require('./Restaurant');

var visitSchema = new mongoose.Schema({
  restaurant: String,
  table: String,
  user: String,
  items: String,
  bill: Number,
  tip: Number,
  started_at: Number,
  ended_at: Number
});

module.exports = mongoose.model('Visit', visitSchema);
