window.app = window.app || {};

app.api = {
	urlRoot: '',

	get: function(url, data, callback){
		$.ajax({
			url: app.api.urlRoot + url,
			data: data,
			dataType: 'json',
			method: 'get',
			success: callback,
			error: function(){
				// TODO
				// global error handler
			}
		});
	},

	post: function(url, data, callback){
		$.ajax({
			url: app.model.urlRoot + url,
			data: data,
			dataType: 'json',
			method: 'post',
			success: callback,
			error: function(){
				// TODO
				// global error handler
			}
		});
	}
}

app.model = {

	groups: {
		getAll: function(callback){
			app.api.get('/dashboard/groups/', '', function (data) {
				var arr = { 'new': 0, 'waiting': 0, 'eating': 0, 'billing': 0, 'free': 0 };
				for (var i in data) {
					var table = data[i];
					if (table.status === 'just_in') {
						arr['new']++;
					} else {
						arr[table.status]++;
					}
				}
				callback(arr);
			});
		},

		getDetails: function (type, callback) {
			app.api.get('/dashboard/groups/details', 'status=' + type, function (data) {
				var obj = { tables: [] };
				for (var i in data) {
					var table = data[i];
					obj.tables.push(table.sno);
				}
				callback(obj);
			});
		},
	},

	orders: {
		markResolved: function (data, callback) {
			console.log(data);
			app.api.get('/visit/delivered', 'tid=' + data.table, function (data) {
				callback(data.result);
			});
		}
	},

	users: {
		getTop: function(callback){
			app.api.get('/dashboard/user/top', '', function (data) {
				var obj = { users: data };
				callback(obj);
			});
		}
	},

	stats: {
		getWeekly: function(callback){
			// app.api.get('stats/weekly', callback);
			var data = {0: [], 1: []};
			for(var i = 0; i<7; i++){
				data[0].push(Math.ceil(Math.random()*100));
				data[1].push(Math.ceil(Math.random()*100));
			}

			callback(data);
		},

		getMonthly: function(callback){
			// app.api.get('stats/weekly', callback);
			var data = {0: [], 1: []};
			for(var i = 0; i<30; i++){
				data[0].push(Math.ceil(Math.random()*100));
				data[1].push(Math.ceil(Math.random()*100));
			}

			callback(data);
		},

		getVisitTypes: function(callback){
			// app.api.get('stats/visit', callback);
			var data = [Math.ceil(Math.random()*100), Math.ceil(Math.random()*100)];
			callback(data);
		}
	},

	menus: {
		getItems: function (callback) {
			// app.api.get('/visit/menu', callback);
			var data = {
				items: [
					{
						item_id: 1,
						name: 'Spicy Veggy Pizza',
						tags: ['veg', 'italian'],
						price: 500
					},
					{
						item_id: 2,
						name: 'Veg burrito',
						tags: ['veg', 'mexican'],
						price: 150
					},
					{
						item_id: 3,
						name: 'Chicken Pizza',
						tags: ['non-veg', 'italian'],
						price: 600
					},
					{
						item_id: 4,
						name: 'Dimsums',
						tags: ['veg', 'chinese'],
						price: 200
					}
				]
			}

			callback(data);
		}
	},
}