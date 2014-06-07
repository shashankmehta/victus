var mongoose = require('mongoose');

var Item = require('./Item');
var Table = require('./Table');
var User = require('./User');
var Restaurant = require('./Restaurant');

var visitSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  bill: Number,
  tip: Number,
  started_at: Number,
  ended_at: Number
});

module.exports = mongoose.model('Visit', visitSchema);
