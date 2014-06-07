var Restaurant = require('../models/Restaurant.js');

/**
 * GET /restaurant/add
 * Add a restaurant form
 */

exports.getRestaurantAdd = function(req, res){
	res.render('restaurant/add',{
		title : 'Add a restaurant',
		email : req.user.email
	})
}

/**
 * POST /restaurant/add
 * Form submission of restaurant
 */
exports.postRestaurantAdd = function(req, res){

	req.assert('name', 'Name field cannot be left blank').isEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/restaurant/add');
  }

  var restaurant = new Restaurant({
  	name : req.body.name,
  	address : req.body.addres,
  	capacity : req.body.capacity,
  	adminEmail : req.user.email
  });

  restaurant.save(function(err){
  	console.log(err);
  })

  //Restaurant is saved, redirect to /dashboard
  res.render('dashboard/index',{
  	title : 'Dashboard'
  })

}

