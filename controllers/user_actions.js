// Required actions
// init
// table availability
// food
// menu6
// reservations
// waiter
// call_payment
// feedback
// music_request

var Visit = require('../models/Visit');

var actions = {
  startProcedure: function (req, res) {
    // Required: rid, tid
    var rid = req.query.rid;
    var tid = req.query.tid;
    var uid = req.user.id;
    var t = new Date().getTime();
    Visit.find({ restaurant: rid, table: tid, ended_at: null }, function (err, docs) {
      if (docs.length === 0) {
        // New visit
        var v = new Visit({ restaurant: rid, table: tid, users: [uid], items: [], bill: 0.0, tip: 0.0, started_at: t, ended_at: null });
        v.save(function (err) {
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

  },

  orderFood: function (req, res) {
    // Required: fid, quantity
    var uid = req.user.id;
    var fid = req.query.fid;
    var quantity = req.query.quantity;

    Visit.findOne({ users: { $in: [uid] }, ended_at: null })
      .populate('items')
      .exec(function (err, visit) {
        console.log(visit);
      });
    res.json({message: "hello, world"});
  },

  makeReservation: function (req, res) {
    // Required: rid, ppl, time
    var rid = req.query.rid;
    var ppl = req.query.ppl;
    var t = req.query.time;
    res.json({"message" : "hello, world"});
  },

  cancelReservation: function (req, res) {
    // Required: rid, res_id
  },

  callForWaiter: function (req, res) {
    // Required: rid, tid
  },

  askForCheck: function (req, res) {
    // Required: rid, tid
  },

  giveFeedback: function (req, res) {
    // Required: rid, tid
  },

  fetchMenu: function (req, res) {
    // Required: rid
  }
};

module.exports = actions;
