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

var actions = {
  startProcedure: function (req, res) {
    // Required: rid, tid
  },

  orderFood: function (req, res) {
    // Required: rid, tid, fid, quantity
  },

  makeReservation: function (req, res) {
    // Required: rid, ppl_num, time
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

  queueMusic: function (req, res) {
    // Required: rid, tid, music_id
  },

  checkForAvailableTable: function (req, res) {
    // Required: rid, number of people, time
  }
};

module.exports = actions;