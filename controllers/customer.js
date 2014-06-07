/**
 * GET /customer/home
 * Dummy response to demonstrate
**/
exports.getHome = function(req,res){
  res.render('customer/index',{
    title : 'Customer Home - My Restaurant'
  })
};