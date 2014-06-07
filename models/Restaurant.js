var mongoose = require('mongoose');

var User = require('./User');

var restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  numTables: Number,
  tables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }],
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
