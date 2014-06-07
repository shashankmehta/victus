var mongoose = require('mongoose');

var restaurantSchema = new mongoose.Schema({ 

	name : 'String',
	address : 'String',
	capacity : Number,
	rid : { type: Number, default : 1},
	adminEmail : 'String'

})
