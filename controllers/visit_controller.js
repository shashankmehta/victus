var db = require('../models');

exports.startNewVisit = function (req, res) {
  var rid = req.query.rid;
  var tid = req.query.tid;
  var uid = req.user.id;
  var time = new Date().getTime();

  db.Visit.findOne({ restaurant: rid, table: tid, ended_at: null }, function (err, visit) {
    // console.log(visit);
    if (!visit) {
      // New visit
      var visit = new db.Visit({ restaurant: rid, table: tid, users: [uid], items: [], bill: 0.0, tip: 0.0, started_at: time, ended_at: null });
      visit.save(function (err) {
        if (err) {
          console.log(err);
        }
        db.Table.findByIdAndUpdate(tid, { status: 'just_in' }, function (err, table) {
          res.json({ result: true });
        });
      });
    } else {
      // Add user to old visit
      db.Visit.findByIdAndUpdate(visit.id, { $push: { "users": uid } }, { safe: true, upsert: true }, function (err, visit) {
        if (err) {
          console.log(err);
        }
        res.json({ result: true });
      });
    }
  });
};

exports.endVisit = function (req, res) {
  var tid = req.body.table;
  var time = new Date().getTime();
  db.Visit.findOne({ table: tid }, function (err, visit) {
    db.Visit.findByIdAndUpdate(visit.id, { ended_at: time }, function (err) {
      if (err) {
        console.log(err);
      }
      db.Table.findByIdAndUpdate(table, { status: 'free' }, function (err, table) {
        res.json({ result: true });
      })
    });
  });
};

exports.orderFood = function (req, res) {
  var uid = req.user.id;
  var item = req.body.item;
  db.Visit.findOne({ users: { $in: [uid] }, ended_at: null }, function (err, visit) {
    // We have the visit
    if (err) {
      console.log(err);
    }
    db.Item.findById(item, function (err, item) {
      // We have the item
      if (err) {
        console.log(err);
      }
      db.Visit.findByIdAndUpdate(visit.id, { $push: { "items": item.id }, bill: visit.bill + item.price }, function (err, visit) {
        // We add the item and update the bill
        res.json({ result: true });
        // Broadcast socket.io event here
      });
    });
  });
};

exports.callForWaiter = function (req, res) {
  var uid = req.user.id;
  db.Visit.findOne({ users: { $in: [uid] }, ended_at: null }, function (err, visit) {
    // We have the visit
    if (err) {
      console.log(err);
    }
    res.send({ result: true });
    // Broadcast socket.io event here
  });
};

exports.callForCheck = function (req, res) {
  var uid = req.user.id;
  db.Visit.findOne({ users: { $in: [uid] }, ended_at: null }, function (err, visit) {
    // We have the visit
    if (err) {
      console.log(err);
    }
    res.json({ amount: visit.bill + 0.125 * visit.bill });
    // Broadcast socket.io event here
  });
};

exports.giveFeedback = function (req, res) {
  var uid = req.user.id;
  var feedback = req.body.feedback;
  db.Visit.findOne({ users: { $in: [uid] } }, function (err, visit) {
    // We have the visit
    if (err) {
      console.log(err);
    }
    var feedback = new db.Feedback({
      user: uid,
      visit: visit.id,
      restaurant: visit.restaurant.id,
      feedback: feedback
    });

    feedback.save(function (err) {
      console.log(err);
    });
  });
};

exports.listMenu = function (req, res) {
  var uid = req.user.id;
  db.Visit.findOne({ users: { $in: [uid] }, ended_at: null }, function (err, visit) {
    // We have the visit
    db.Item.find({ restaurant: visit.restaurant }, function (err, items) {
      // We have all the menu items
      res.json(items);
    });
  });
};
