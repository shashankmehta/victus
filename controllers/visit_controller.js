var db = require('../models');

// POST REQUIRED
exports.startNewVisit = function (io) {
  return function (req, res) {
    var rid = req.query.rid;
    var tid = req.query.tid;
    var uid = req.user.id;
    var time = new Date().getTime();

    var visit = new db.Visit({ restaurant: rid, table: tid, user: uid, items: [], quan: [], bill: 0.0, tip: 0.0, started_at: time, ended_at: null });
    visit.save(function (err) {
      if (err) {
        console.log(err);
      }
      db.Table.findByIdAndUpdate(tid, { status: 'just_in' }, function (err, table) {
        if (table) {
          res.json({ result: true });
          io.sockets.emit('new_table', { evt: 'new_table', table: table.sno });
        } else {
          res.json({ result: false });
        }
      });
    });
  }
};

exports.endVisit = function (req, res) {
  var tid = req.query.tid;
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
    var quan = JSON.parse(req.query.quantity);
    db.Visit.findOne({ user: uid, ended_at: null }, function (err, visit) {
      // We have the visit
      if (err) {
        console.log(err);
      }
      if (visit) {
        db.Visit.findByIdAndUpdate(visit.id, { items: items, quan: quan }, function (err, visit) {
          if (err) {
            console.log(err);
          }
          if (visit) {
            db.Table.findByIdAndUpdate(visit.table, { status: 'waiting' }, function (err, table) {
              if (err) {
                console.log(err);
              }
              if (table) {
                var arr = [];
                for (var i in items) {
                  (function (k) {
                    var item = items[k];
                    db.Item.findById(item, function (err, itemObj) {
                      var x = {};
                      x.quantity = quan[k];
                      x.name = itemObj.name;
                      arr.push(x);
                      if (arr.length === items.length) {
                        io.sockets.emit('food', { evt: 'food', items: arr, table: table.sno, level: Math.ceil((Math.random() * 10) % 5) });
                      }
                    });
                  })(i);
                }
                res.json({ result: true });
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
        db.findById(visit.table, function (err, table) {
          if (err) {
            console.log(err);
          }
          if (table) {
            res.send({ result: true });
            io.sockets.emit('waiter', { evt: 'waiter', table: table.sno });
          } else {
            res.send({ result: false });
          }
        });
      } else {
        res.send({ result: false });
      }
    });
  }
};

exports.markResolved = function (io) {
  return function (req, res) {
    var tid = req.query.tid;
    var admin = req.user.id;
    db.Restaurant.findOne({ admin: admin }, function (err, restaurant) {
      if (err) {
        console.log(err);
      }

      if (restaurant) {
        db.Table.findOne({ owner: restaurant.id, sno: tid }, function (err, table) {
          if (err) {
            console.log(err);
          }
          if (table) {
            db.Table.findByIdAndUpdate(table.id, { status: 'eating' }, function (err, table) {
              if (err) {
                console.log(err);
              }

              if (table) {
                res.json({ result: true });
                io.sockets.emit('mark_resolved', { result: true });
              } else {
                res.json({ result: false });
              }
            });
          } else {
            res.json({ result: false })
          }
        });
      } else {
        res.json({ result: false })
      }
    });
  }
};

exports.callForCheck = function (io) {
  return function (req, res) {
    var uid = req.user.id;
    db.Visit.findOne({ user: uid, ended_at: null }, function (err, visit) {
      // We have the visit
      if (visit) {
        db.Table.findByIdAndUpdate(visit.table, { status: 'free' }, function (err, table) {
          if (err) {
            console.log(err);
          }
          if (table) {
            res.json({ result: true, amount: visit.bill + 0.125 * visit.bill });
            io.sockets.emit('payment', { evt: 'payment', table: table.sno });
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
