/**
 * GET /dashboard
 * Dummy response to demonstrate
**/
exports.getDashboard = function(req,res){
	res.render('dashboard/index',{
		title : 'Dashboard - My Restaurant'
	})
};