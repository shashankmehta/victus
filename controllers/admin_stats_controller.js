var db = require('../models');

exports.getInitGroupOfTables = function (req, res) {
  var admin = req.user.id;
  db.Restaurant.findOne({ admin: admin }, function (err, restaurant) {
    if (restaurant) {
      if (err) {
        console.log(err);
      }
      db.Table.find({ owner: restaurant.id }, function (err, tables) {
        if (err) {
          console.log(err);
        }
        res.json(tables);
      });
    } else {
      res.json({ result: false });
    }
  });
};

exports.getNumbersOfTableType = function (req, res) {
  var admin = req.user.id;
  db.Restaurant.findOne({ admin: admin }, function (err, restaurant) {
    if (restaurant) {
      if (err) {
        console.log(err);
      }
      db.Table.find({ owner: restaurant.id, status: req.query.status }, function (err, tables) {
        if (err) {
          console.log(err);
        }
        res.json(tables);
      });
    } else {
      res.json({ result: false });
    }
  });
};

exports.getCurrentTopUsers = function (req, res) {
  var admin = req.user.id;
  var uid = req.query.uid;

  db.restaurant.findOne({ admin: admin }, function (err, restaurant) {
    if (restaurant) {
      if (err) {
        console.log(err);
      }
      db.Visit.find({ restaurant: restaurant.id }, function (err, visits) {
        if (visits) {
          if (err) {
            console.log(err);
          }
        } else {

        }
      });
    } else {
      res.json({ result: false });
    }
  });
};

exports.getUserDetails = function (req, res) {
  var admin = req.user.id;
  var uid = req.query.uid;

  db.Restaurant.find({ admin: admin }, function (err, restaurant) {

  });

};
