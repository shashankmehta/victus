// Required actions
// register
// create menu
// confirm payment and complete visit

var Visit = require('../models/Visit');
var Item = require('../models/Item');

var actions = {
  confirmPayment: function (req, res) {
    var vid = req.query.vid;
    var tip = req.query.tip || 0.0;
  },

  addMenuItem: function (req, res) {
    var uid = req.user.id;
    var rid = 0; // find through user

    var name = req.query.name;
    var price = req.query.price;
    var tags = req.query.tags.split(', ');
    var image = req.query.image;

    var item = new Item({ restauraunt: rid, name: name, price: price, image: image, tags: tags });
    item.save(function (err) {
      if (err) {
        console.log(err);
      }
      console.log('Item saved')
    });
  }
};

module.exports = actions;
