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
			// app.api.get('allStatus');
			var data = {
				'new': 3,
				'waiting': 5,
				'eating': 7
			}

			callback(data);
		},

		getDetails: function(type, callback){
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
	}
}