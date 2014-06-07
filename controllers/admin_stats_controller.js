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

exports.getCurrentUsers = function (req, res) {
  var admin = req.user.id;
  var max = -1;
  var array = [];

  db.Restaurant.findOne({ admin: admin }, function (err, restaurant) {
    if (err) {
      console.log(err);
    }
    if (restaurant) {
      db.Visit.find({ restaurant: restaurant.id, ended_at: null }, function (err, visits) {
        if (err) {
          console.log(err);
        }
        if (visits) {
          var users = [];
          for (var i in visits) {
            var visit = visits[i];

            db.User.findById(visit.user, function (err, user) {
              if (user) {
                if (err) {
                  console.log(err);
                }
                db.Visit.count({ restaurant: restaurant.id, user: user.id }, function (err, count) {
                  if (max < count) {
                    max = count;
                  }
                  users.push({ user_id: user.id, name: user.profile.name, count: count, level: 0 });
                  if (users.length === visits.length) {
                    for (var j in users) {
                      users[j].level = (users[j].count / max * 1.0 ) * 5;
                    }
                    res.json(users);
                  }
                });
              } else {
                res.json({ result: false });
              }
            });
          }
        } else {
          res.json({ result: false });
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
