var db = require('../models')

/**
 * /GET past visits of user in a given restaurant
 * if visit in progress display all other visits otherwise
 */

exports.getUserStats = function(req, res){

	var userid = req.user.id;
	//Search sorted 
	db.Visit.find({ user : userid }, {}, { sort : { 'started_at' : -1 } , limit : 1 }, function(err, visit){
		if(err) console.log(err);
		last_visit = visit[0];
		if(!last_visit.ended_at){
			//Visit is Ongoing
			db.Visit.find({ user : userid, restaurant : last_visit.restaurant }, function(err, visits){
				//Fetch all last visits to current state
				res.json({ ongoing_visit : 'true', visits : visits})
			});
		}

	})

}