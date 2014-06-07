window.app = window.app || {};

app.api = {
	urlRoot: '/dashboard/',

	get: function(url, data, callback){
		$.ajax({
			url: app.model.urlRoot + url,
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
			// app.api.get('groups/details');
			var data = {
				'new': 2,
				'waiting': 5,
				'eating': 7,
				'billing': 4,
				'free': 3
			}

			callback(data);
		},

		getDetails: function(type, callback){
			// app.api.get('groups/details', callback);
			var data = {
				tables: [1, 2, 5]
			}
			callback(data);
		},
	},

	orders: {
		markResolved: function(data, callback){
			// app.api.post('orders', data,callback);
			callback(true);
		}
	},

	users: {
		getTop: function(callback){
			// app.api.get('/users/top', callback);
			
			var data = {
				users: [
					{
						user_id: 1,
						name: 'Shashank Mehta',
						level: 5
					},
					{
						user_id: 3,
						name: 'Divij Bindlish',
						level: 4
					},
					{
						user_id: 2,
						name: 'Ashwini Khare',
						level: 3
					},
					{
						user_id: 4,
						name: 'Abhishek Kandoi',
						level: 1
					}
				]
			}

			callback(data);
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
	}
}