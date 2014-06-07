var db = require('../models');

/**
 * GET /restaurant/add
 * Add a restaurant form
 */

exports.displayGetForm = function(req, res){
	res.render('restaurant/add',{
		title : 'Add a restaurant'
	})
}

/**
 * POST /restaurant/add
 * Form submission of restaurant
 */
exports.saveRestaurant = function (req, res) {

  req.assert('name', 'Name field cannot be left blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/restaurant/add');
  }

  var restaurant = new db.Restaurant({
    name: req.body.name,
    address: req.body.address,
    numTables : req.body.tables,
    admin: req.user.id
  });

  restaurant.save(function (err, restaurant) {
    if (err) {
      console.log(err);
    }

    for (var i = 0; i < restaurant.numTables; i++) {
      var table = new db.Table({
        status: 'free',
        sno: i,
        owner: restaurant.id
      });

      table.save(function(err, table) {
        if (err) {
          console.log(err);
        }
        restaurant.tables.push(table.id);
        if (restaurant.tables.length == req.body.tables) {
          restaurant.save(function (err, restaurant) {
            console.log(restaurant);
            req.flash('success', { msg : 'Restaurant successfully added' });
            res.redirect('/dashboard');
          });
        }
      });
    }
  });

};
