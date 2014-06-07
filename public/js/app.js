window.app = window.app || {};

app.cache = {};

$(document).ready(function(){
	var view = new app.view.TableGroups;
	var cust = new app.view.TopCustomers;

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
});