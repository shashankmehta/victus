var db = require('../models');

exports.listAllFeedback = function (req, res) {
  var admin = req.user.id;

  db.Restaurant.findOne({ admin: admin }, function (err, restaurant) {
    if (err) {
      console.log(err);
    }
    if (restaurant) {
      
    } else {
      res.json({ result: false });
    }
  });
};