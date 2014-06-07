var mongoose = require('mongoose');

var User = require('./User');

var restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  numTables: Number,
  tables: Array,
  admin: String
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
