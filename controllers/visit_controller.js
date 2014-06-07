var db = require('../models');

var actions = {
  createNewVisit: function (req, res) {
    var rid = req.query.rid;
    var tid = req.query.tid;
    var uid = req.user.id;
    var t = new Date().getTime();
    db.Visit.findOne({ restaurant: rid, table: tid, ended_at: null }, function (err, docs) {
      if (docs.length === 0) {
        // New visit
        var visit = new db.Visit({ restaurant: rid, table: tid, users: [uid], items: [], bill: 0.0, tip: 0.0, started_at: t, ended_at: null });
        visit.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
      } else {
        // Add user to old visit
        var id = docs[0]._id;
        Visit.findByIdAndUpdate(id, { $push: { "users": uid } }, { safe: true, upsert: true }, function (err, model) {
          if (err) {
            console.log(err);
          }
          console.log(model);
        });
      }
    });
  }
}