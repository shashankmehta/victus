var mongoose = require('mongoose');

var tableSchema = new mongoose.Schema({
  status: String,
  sno: Number,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
});

module.exports = mongoose.model('Table', tableSchema);
