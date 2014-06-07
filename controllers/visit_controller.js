var db = require('../models');

// POST REQUIRED
exports.startNewVisit = function (io) {
  return function (req, res) {
    var rid = req.query.rid;
    var tid = req.query.tid;
    var uid = req.user.id;
    var time = new Date().getTime();

    var visit = new db.Visit({ restaurant: rid, table: tid, user: uid, items: [], bill: 0.0, tip: 0.0, started_at: time, ended_at: null });
    visit.save(function (err) {
      if (err) {
        console.log(err);
      }
      db.Table.findByIdAndUpdate(tid, { status: 'just_in' }, function (err, table) {
        if (table) {
          res.json({ result: true });
          io.sockets.emit('new_table', { evt: 'new_table', table: tid });
        } else {
          res.json({ result: false });
        }
      });
    });
  }
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

// POST REQUIRED
exports.orderFood = function (io) {
  return function (req, res) {
    var uid = req.user.id;
    var items = JSON.parse(req.query.items);
    db.Visit.findOne({ user: uid, ended_at: null }, function (err, visit) {
      // We have the visit
      if (err) {
        console.log(err);
      }
      if (visit) {
        db.Visit.findByIdAndUpdate(visit.id, { items: items }, function (err, visit) {
          if (err) {
            console.log(err);
          }
          if (visit) {
            db.Table.findByIdAndUpdate(visit.table, { status: 'waiting' }, function (err, table) {
              if (err) {
                console.log(err);
              }
              if (table) {
                res.json({ result: true });
                io.sockets.emit('food', { evt: 'food', items: items, table: visit.table })
              } else {
                res.json({ result: false });
              }
            });
          } else {
            res.json({ result: false });
          }
        });
      } else {
        res.json({ result: false });
      }
   });
  }
};

exports.callForWaiter = function (io) {
  return function (req, res) {
    var uid = req.user.id;
    db.Visit.findOne({ user: uid, ended_at: null }, function (err, visit) {
      // We have the visit
      if (err) {
        console.log(err);
      }
      if (visit) {
        res.send({ result: true });
        io.sockets.emit('waiter', { evt: 'waiter', table: visit.table });
      } else {
        res.send({ result: false });
      }
    });
  }
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

exports.callForCheck = function (io) {
  return function (req, res) {
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
            console
            io.sockets.emit('payment', { evt: 'payment', table: visit.table });
          } else {
            res.json({ result: false });
          }
        });
      } else {
        res.json({ result: false });
      }
    });
  }
};

// POST REQUIRED
exports.giveFeedback = function (io) {
  return function (req, res) {
    var uid = req.user.id;
    var feedback = req.query.feedback;
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
            io.sockets.emit('feedback', { evt: 'feedback', table: visit.table });
          } else {
            res.json({ result: false });
          }
        });
      } else {
        res.json({ result: false });
      }
    });
  }
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
