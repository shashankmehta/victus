window.app = window.app || {};

app.cache = {};
app.orders = 1;

$(document).ready(function(){

	var routes = {
		'/': function(){
			var template = Handlebars.compile($('.script-main-page').html());
			var view = template();
			$('.main').append(view);

			var view = new app.view.TableGroups;
			var cust = new app.view.TopCustomers;

			var width = $('.orders .box').width();
			var $container = $('.orders .box');
			$container.masonry({
				columnWidth: width/2,
				itemSelector: '.order'
			});	

			setTimeout(function(){
				new app.view.Order({
					order_id: 12,
					table: 7,
					level: 3,
					items: [
						{
							name: 'Garlic Chicken',
							quantity: '2'
						},
						{
							name: 'Mixed Veg',
							quantity: '1'
						},
						{
							name: 'Mixed Veg',
							quantity: '1'
						}
					]
				})
			}, 1000);
			setTimeout(function(){
				new app.view.Order({
					order_id: 15,
					table: 8,
					level: 4,
					items: [
						{
							name: 'Garlic Chicken',
							quantity: '2'
						},
						{
							name: 'Mixed Veg',
							quantity: '1'
						}
					]
				})
			}, 1200);
			setTimeout(function(){
				new app.view.Order({
					order_id: 15,
					table: 11,
					level: 1,
					items: [
						{
							name: 'Garlic Chicken',
							quantity: '2'
						},
						{
							name: 'Mixed Veg',
							quantity: '1'
						}
					]
				})
			}, 2200);
			setTimeout(function(){
				new app.view.Order({
					order_id: 15,
					table: 12,
					level: 3,
					items: [
						{
							name: 'Garlic Chicken',
							quantity: '2'
						},
						{
							name: 'Mixed Veg',
							quantity: '1'
						}
					]
				})
			}, 3200);

			setTimeout(function(){
				new app.view.Order({
					order_id: 15,
					table: 12,
					level: 3,
					items: [
						{
							name: 'Garlic Chicken',
							quantity: '2'
						},
						{
							name: 'Mixed Veg',
							quantity: '1'
						}
					]
				})
			}, 4200);
		},

		'/stats': function(){
			new app.view.Stats;
		}
	};

	app.router = Router(routes);
	app.router.init();

	if(window.location.hash == ''){
		window.location.hash = '/';
	}


});