var mongoose = require('mongoose');

var tableSchema = new mongoose.Schema({
  status: String
});

module.exports = mongoose.model('Table', tableSchema);
