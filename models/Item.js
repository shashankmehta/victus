var mongoose = require('mongoose');

var Restaurant = require('./Restaurant');

var itemSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'},
  name: String,
  tags: Array,
  price: Number
});

module.exports = mongoose.model('Item', itemSchema);
