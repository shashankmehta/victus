var Item = require('./Item');
var Restaurant = require('./Restaurant');
var Table = require('./Table');
var User = require('./User');
var Visit = require('./Visit');
var Feedback = require('./Feedback');

var db = {
  Item: Item,
  Restaurant: Restaurant,
  Table: Table,
  User: User,
  Visit: Visit,
  Feedback: Feedback
};

module.exports = db;
