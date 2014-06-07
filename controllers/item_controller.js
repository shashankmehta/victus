var db = require('../models');

exports.displayGetForm = function (req, res) {
  res.render('item/add', {
    title: 'Add a new item to the menu'
  })
};

exports.saveItem = function (req, res) {

  req.assert('name', 'Name field cannot be left blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/item/add');
  }

  db.Restaurant.findOne({ admin: req.user.id }, function (err, restaurant) {
    if (err) {
      console.log(err);
    }

    var item = new db.Item({
      name: req.body.name,
      price: req.body.price,
      tags : req.body.tags.split(', '),
      restaurant: restaurant.id
    });

    item.save(function (err) {
      if (err) {
        console.log(err);
      }
    });

    req.flash('success', { msg : 'Item successfully added' });

    //Item is saved, redirect to /dashboard

    res.redirect('/item/add');

  });

};
