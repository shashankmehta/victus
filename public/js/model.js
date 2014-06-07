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
	getAllGroups: function(callback){
		if(app.cache.allGroups != undefined){
			callback(app.cache.allStatus);
			return;
		}

		// app.api.get('allStatus');
		var data = {
			'new': 3,
			'waiting': 5,
			'eating': 7
		}

		callback(data);
	},

	getGroupDetails: function(type, callback){
		if(app.cache.groupDetails && app.cache.groupDetails[type]){
			callback(app.cache.groupDetails[type]);
			return;
		}

		var data = {
			tables: [1, 2, 5]
		}
		callback(data);
	}
}