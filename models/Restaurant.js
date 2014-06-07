var mongoose = require('mongoose');

var restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  numTables: Number,
  capacity: Number,
  admin: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);

