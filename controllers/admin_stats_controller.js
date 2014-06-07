var db = require('../models');

exports.getInitGroupOfTables = function (req, res) {
  var admin = req.user.id;
  db.Restaurant.findOne({ admin: admin }, function (err, restaurant) {
    if (err) {
      console.log(err);
    }
    db.Table.find({ owner: restaurant.id }, function (err, tables) {
      if (err) {
        console.log(err);
      }
      res.json(tables);
    });
  });
};

exports.getNumbersOfTableType = function (req, res) {
  var admin = req.user.id;
  db.Restaurant.findOne({ admin: admin }, function (err, restaurant) {
    if (err) {
      console.log(err);
    }
    db.Table.find({ owner: restaurant.id, status: req.query.status }, function (err, tables) {
      if (err) {
        console.log(err);
      }
      res.json(tables);
    });
  });
}