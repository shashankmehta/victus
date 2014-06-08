/**
 * GET /customer/home
 * Dummy response to demonstrate
**/
exports.getHome = function(req,res){
  if(req.query.rid) {
    var rid = req.query.rid;
  }
  if(req.query.tid) {
    var tid = req.query.tid;
  }

  res.render('customer/index',{
    title : 'Customer Home - My Restaurant',
    rid: rid,
    tid: tid
  })
};