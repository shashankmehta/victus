var db = require('../models');

exports.startNewVisit = function (req, res) {
  var rid = req.query.rid;
  var tid = req.query.tid;
  var uid = req.user.id;
  var time = new Date().getTime();

  var visit = new db.Visit({ restaurant: rid, table: tid, user: uid, items: [], bill: 0.0, tip: 0.0, started_at: time, ended_at: null });
  visit.save(function (err) {
    if (err) {
      console.log(err);
    }
    db.Table.findByIdAndUpdate(tid, { status: 'waiting' }, function (err, table) {
      if (table) {
        res.json({ result: true });
      } else {
        res.json({ result: false });
      }
    });
  });
};

exports.endVisit = function (req, res) {
  var tid = req.body.table;
  var time = new Date().getTime();
  db.Visit.findOne({ table: tid }, function (err, visit) {
    if (visit) {
      db.Visit.findByIdAndUpdate(visit.id, { ended_at: time }, function (err) {
        if (err) {
          console.log(err);
        }
        db.Table.findByIdAndUpdate(tid, { status: 'free' }, function (err, table) {
          if (table) {
            res.json({ result: true });
          } else {
            res.json({ result: false });
          }
        })
      });
    } else {
      res.json({ result: false });
    }
  });
};

exports.orderFood = function (req, res) {
  var uid = req.user.id;
  var items = JSON.parse(req.body.items);
  db.Visit.findOne({ user: uid, ended_at: null }, function (err, visit) {
    // We have the visit
    if (err) {
      console.log(err);
    }
    if (visit) {
      db.Visit.findByIdAndUpdate(visit.id, { "items": items }, function (err, visit) {
        if (err) {
          console.log(err);
        }
        if (visit) {
          res.json({ result: true });
          // Broadcast socket.io event here
        } else {
          res.json({ result: false });
        }
      });
    } else {
      res.json({ result: false });
    }
  });
};

exports.callForWaiter = function (req, res) {
  var uid = req.user.id;
  db.Visit.findOne({ user: uid, ended_at: null }, function (err, visit) {
    // We have the visit
    if (err) {
      console.log(err);
    }
    if (visit) {
      res.send({ result: true });
    } else {
      res.send({ result: false });
    }
    // Broadcast socket.io event here
  });
};

exports.markResolved = function (req, res) {
  var tid = req.body.table;
  db.Table.findByIdAndUpdate(tid, { status: 'eating' }, function (err, table) {
    if (err) {
      console.log(err);
    }
    if (table) {
      res.json({ result: true });
    } else {
      res.json({ result: false });
    }
  });
};

exports.callForCheck = function (req, res) {
  var uid = req.user.id;
  db.Visit.findOne({ user: uid, ended_at: null }, function (err, visit) {
    // We have the visit
    if (visit) {
      db.Table.findByIdAndUpdate(visit.table, { status: 'billing' }, function (err, table) {
        if (err) {
          console.log(err);
        }
        if (table) {
          res.json({ result: true, amount: visit.bill + 0.125 * visit.bill });
        } else {
          res.json({ result: false });
        }
      });
    } else {
      res.json({ result: false });
    }
    // Broadcast socket.io event here
  });
};

exports.giveFeedback = function (req, res) {
  var uid = req.user.id;
  var feedback = req.body.feedback;
  db.Visit.findOne({ user: uid }, function (err, visit) {
    // We have the visit
    if (visit) {
      if (err) {
        console.log(err);
      }
      var feedback = new db.Feedback({
        user: uid,
        visit: visit.id,
        restaurant: visit.restaurant,
        feedback: feedback
      });

      feedback.save(function (err, feedback) {
        if (err) {
          console.log(err);
        }
        if (feedback) {
          res.json({ result: true });
        } else {
          res.json({ result: false });
        }
      });
    } else {
      res.json({ result: false });
    }
  });
};

exports.listMenu = function (req, res) {
  var uid = req.user.id;
  db.Visit.findOne({ user: uid, ended_at: null }, function (err, visit) {
    // We have the visit
    if (visit) {
      db.Item.find({ restaurant: visit.restaurant }, function (err, items) {
        // We have all the menu items
        res.json(items);
      });
    } else {
      res.json({ result: false });
    }
  });
};
