var mongoose = require('mongoose');

var Visit = require('./Visit');
var User = require('./User');
var Restaurant = require('./Restaurant');

var feedbackSchema = new mongoose.Schema({
  restaurant: String,
  user: String,
  visit: String,
  feedback: String
});

module.exports = mongoose.model('Feedback', feedbackSchema);
