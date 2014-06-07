var mongoose = require('mongoose');

var Restaurant = require('./Restaurant');

var itemSchema = new mongoose.Schema({
  restaurant: String,
  name: String,
  tags: Array,
  price: Number
});

module.exports = mongoose.model('Item', itemSchema);
