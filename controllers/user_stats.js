var db = require('../models');
var async = require('async');
/**
 * /GET past visits of user in a given restaurant
 * if visit in progress display all other visits otherwise
 */

exports.getUserStats = function(req, res){

	var userid = req.user.id;
	// Search sorted
	db.Visit.find({ user : userid }, {}, { sort : { 'started_at' : -1 } , limit : 1 }, function(err, visit){

		if(err) console.log(err);

		last_visit = visit[0];

		if(!last_visit.ended_at){
			//Visit is Ongoing

			db.Visit.find({ user : userid, restaurant : last_visit.restaurant }, function(err, visits){

				//Fetch all last visits to current state
				var orders =  [];

				async.each(visits, function(v){

					for(var i=0; i<v.items.length; i++){

						(function(i){
							db.Item.findOne({ id : v.items[i].id }, function(err, item){
							orders.push(item.name);
							if(i==v.items.length-1)
								res.json({ ongoing_visit : 'true', orders : orders })
							})
						})(i);
					}

				}, function(err){

					if(err) console.log(err);

				})

			});
		}
		else {
			//Display last few orders
			db.Visit.find({ user : userid}, function(err, visits){
				var past_orders_collection =  [];

				async.each(visits, function(v, callback){

					order = {};

					order["date"] = v.started_at;

					order["past_orders"] = [];

					db.Restaurant.findOne({ _id: v.restaurant }, function(err, restaurant){
						// console.log(restaurant,v.restaurant);
					  order["restaurant"] = restaurant.name;
					})


					for(var i=0; i<v.items.length; i++){
					
						(function(i){
							db.Item.findOne({ id : v.items[i].id }, function(err, item){
							order.past_orders.push(item.name);
							if(i==v.items.length-1){
								past_orders_collection.push(order);
								callback();
							}
							})
						})(i);
					}			

				}, function(err){

					res.json({ ongoing_visit : 'false', past_orders : past_orders_collection })
					
					if(err) console.log(err);
					
				})

			})



		}

	})

}