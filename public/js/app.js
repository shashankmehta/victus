window.app = window.app || {};

app.helpers = {
	clear: function(){
		$('.main').html('');
	}
}

app.cache = {};
app.orders = 1;

$(document).ready(function(){

	var routes = {
		'/': function(){
			app.helpers.clear();
			var template = Handlebars.compile($('.script-main-page').html());
			var view = template();
			$('.main').append(view);

			var view = new app.view.TableGroups;
			var cust = new app.view.TopCustomers;

			app.model.orders.initial(function(data){
				for(var i in data){
					new app.view.Order(data[i]);
				}
			})

			var width = $('.orders .box').width();
			var $container = $('.orders .box');
			$container.masonry({
				columnWidth: width/2,
				itemSelector: '.order'
			});

			// setTimeout(function(){
			// 	new app.view.Order({
			// 		order_id: 12,
			// 		table: 7,
			// 		level: 3,
			// 		items: [
			// 			{
			// 				name: 'Garlic Chicken',
			// 				quantity: '2'
			// 			},
			// 			{
			// 				name: 'Mixed Veg',
			// 				quantity: '1'
			// 			},
			// 			{
			// 				name: 'Mixed Veg',
			// 				quantity: '1'
			// 			}
			// 		]
			// 	})
			// }, 1000);
			// setTimeout(function(){
			// 	new app.view.Order({
			// 		order_id: 15,
			// 		table: 8,
			// 		level: 4,
			// 		items: [
			// 			{
			// 				name: 'Garlic Chicken',
			// 				quantity: '2'
			// 			},
			// 			{
			// 				name: 'Mixed Veg',
			// 				quantity: '1'
			// 			}
			// 		]
			// 	})
			// }, 1200);
			// setTimeout(function(){
			// 	new app.view.Order({
			// 		order_id: 15,
			// 		table: 11,
			// 		level: 1,
			// 		items: [
			// 			{
			// 				name: 'Garlic Chicken',
			// 				quantity: '2'
			// 			},
			// 			{
			// 				name: 'Mixed Veg',
			// 				quantity: '1'
			// 			}
			// 		]
			// 	})
			// }, 2200);
			// setTimeout(function(){
			// 	new app.view.Order({
			// 		order_id: 15,
			// 		table: 12,
			// 		level: 3,
			// 		items: [
			// 			{
			// 				name: 'Garlic Chicken',
			// 				quantity: '2'
			// 			},
			// 			{
			// 				name: 'Mixed Veg',
			// 				quantity: '1'
			// 			}
			// 		]
			// 	})
			// }, 3200);

			// setTimeout(function(){
			// 	new app.view.Order({
			// 		order_id: 15,
			// 		table: 12,
			// 		level: 3,
			// 		items: [
			// 			{
			// 				name: 'Garlic Chicken',
			// 				quantity: '2'
			// 			},
			// 			{
			// 				name: 'Mixed Veg',
			// 				quantity: '1'
			// 			}
			// 		]
			// 	})
			// }, 4200);
		},

		'/stats': function(){
			app.helpers.clear();
			new app.view.Stats;
		},

		'/feedback': function(){
			app.helpers.clear();
			$('.main').append('<h3 style="text-align: center;">Feedback</h3>');
			app.model.getFeedback(function(data){
				var items = data;
				for(var i in items){
					new app.view.Feedback(items[i]);
				}
			});
		}
	};

	app.router = Router(routes);
	app.router.init();

	if(window.location.hash == ''){
		window.location.hash = '/';
	}


});