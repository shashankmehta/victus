window.app = window.app || {};

function View(templateClass, parent, options) {
	if(typeof options != 'object'){
		options = {};
	}

	containerClass = options['containerClass'] || '';
	data = options['data'] || {};
	position = options['position'] || 'append';

	this.templateClass = templateClass;
	this.parent = parent;
	this.position = position;

	$('.container').removeClass().addClass('container').addClass(containerClass);

	var source = $(this.templateClass).html();

	this.template = Handlebars.compile(source);
	this.view = this.template(data);
	this.templateClass = '.' + this.templateClass.substr(8);

	return this.render(parent);
}

/**
 * This creates an instance of $ that is relative to the view and not to the entire body
 * And it returns the HTML for inserting into DOM.
 */
View.prototype.render = function(){

	if(this.position == 'append'){
		$(this.parent).append('<div class="' + this.templateClass.substr(1) + '"></div>');
		this.$el = $(this.templateClass).last().append(this.view);
	}
	else if(this.position == 'prepend'){
		$(this.parent).prepend('<div class="' + this.templateClass.substr(1) + '"></div>');
		this.$el = $(this.templateClass).first().append(this.view);
	}

	var that = this;
	this.$ = function(selector){
		return $(that.$el).find(selector);
	}

	return {
		'$el': this.$el,
		'$': this.$
	};
}

// Expose View function
app.View = View;
var socket = io.connect('/');

app.view = {
	TableGroups: function(){
		var parent = '.tableGroups';

		var view = {
			showGroupDetails: function(obj){
				var type = $(obj).data('type')
				if(view.$('.group-details').length != 0){
					view.childView.animateOut();
				}
				else {
					view.childView = new app.view.TableGroupDetails(type);
				}
			},

			socketCatch: function(){
				socket.on('food', function (data){
					if(view.data.new >= 1){
						view.data.new--;
						view.data.waiting++;
						view.$('.set[data-type="new"] .number').text(view.data.new);
						view.$('.set[data-type="waiting"] .number').text(view.data.waiting);
					}
					new app.view.Order(data);
				});
				socket.on('payment', function (data){
					if(view.data.eating >= 1){
						view.data.eating--;
						view.data.free++;
						view.$('.set[data-type="eating"] .number').text(view.data.eating);
						view.$('.set[data-type="free"] .number').text(view.data.free);
						view.$('.set[data-type="billing"] .number').text(view.data.billing);
						if($('.custom_modal').is(':visible')){
						  $('.custom_modal .content .text').append('<br>Table #'+data.table+' requested for their bill');
						}
						else {
						  $('.custom_modal .content .text').html('Table #'+data.table+' requested for their bill');
						  $('.custom_modal').fadeIn(200);
						  $('.custom_modal .btn').click(function(){
						    $('.custom_modal').fadeOut(200);
						  })
						}
					}
				});
				socket.on('mark_resolved', function (data){
					if(view.data.waiting >= 1){
						view.data.eating++;
						view.data.waiting--;
						$('.set[data-type="eating"] .number').text(view.data.eating);
						$('.set[data-type="waiting"] .number').text(view.data.waiting);
					}
				});
			},

			init: function(data){
				var page = new app.View('.script-table-groups', parent, {data: data});
				for (var key in page){
					view[key] = page[key];
				}
				view.data = data;

				view.$('.set').click(function(){
					view.showGroupDetails(this);
				});

				view.socketCatch();
			}
		}

		app.model.groups.getAll(view.init);
		return view;
	},

	TableGroupDetails: function(type){
		var parent = '.table-groups';

		var view = {
			init: function(data){
				var page = new app.View('.script-group-details', parent, {data: data});
				for (var key in page){
					view[key] = page[key];
				}
				view.data = data;
				view.height = view.$el.height();
				view.animateIn();
			},

			animateIn: function(){
				view.$el.height(0);
				view.$el.animate({'height': view.height}, 500);
			},

			animateOut: function(){
				view.$el.animate({
					'height': 0
				}, {
					duration: 500,
					complete: function(){
						view.$el.remove();
					}
				});
			}
		}

		app.model.groups.getDetails(type, view.init);
		return view;
	},

	Order: function(data){
		var view = {
			init: function(data){
				var parent = '.orders .box';
				var page = new app.View('.script-order', parent, {data: data});
				for (var key in page){
					view[key] = page[key];
				}
				view.data = data;

				$('.orders .box')
					.masonry('appended', view.$el);

				view.$('a').click(view.markResolved);
			},

			markResolved: function(){

				var data = {
					table: view.data.table
				}

				app.model.orders.markResolved(data, function(){
					var $container = $('.orders .box');
					$container.masonry('remove', view.$el);
					$('.orders .box').masonry();
				});
			}
		}

		view.init(data);
		return view;
	},

	TopCustomers: function(){
		var view = {
			init: function(data){
				var parent = '.topCustomers';
				var page = new app.View('.script-customers', parent, {data: data});
				for (var key in page){
					view[key] = page[key];
				}
				view.data = data;
			}
		}

		app.model.users.getTop(view.init);
	},

	Stats: function(){
		var view = {
			init: function(){
				var parent = '.main';
				var page = new app.View('.script-stats', parent);
				for (var key in page){
					view[key] = page[key];
				}

				var width = $('.main').width();
				var left = width * 2/3 - 50;
				view.$('#weekly').attr('width', left);
				view.$('#monthly').attr('width', width);
				view.$('#visittype').attr('width', width - left - 50);

				app.model.stats.getWeekly(view.showWeekly);
				app.model.stats.getMonthly(view.showMonthly);
				app.model.stats.getVisitTypes(view.showVisitTypes);
			},

			showWeekly: function(data){
				var dataset = {
					labels : [1,2,3,4,5,6,7],
					datasets : [
						{
							fillColor : "rgba(230, 126, 34,0.5)",
							strokeColor : "rgba(220,220,220,1)",
							pointColor : "rgba(220,220,220,1)",
							pointStrokeColor : "#fff",
							data : data[0]
						},
						{
							fillColor : "rgba(52, 152, 219,0.5)",
							strokeColor : "rgba(151,187,205,1)",
							pointColor : "rgba(151,187,205,1)",
							pointStrokeColor : "#fff",
							data : data[1]
						}
					]
				}

				var ctx = document.getElementById("weekly").getContext("2d");
				new Chart(ctx).Line(dataset);
			},

			showMonthly: function(data){
				var labels = [];
				for(var i = 0; i<30; i++){
					labels.push(i);
				}
				var dataset = {
					labels : labels,
					datasets : [
						{
							fillColor : "rgba(230, 126, 34,0.5)",
							strokeColor : "rgba(220,220,220,1)",
							pointColor : "rgba(220,220,220,1)",
							pointStrokeColor : "#fff",
							data : data[0]
						},
						{
							fillColor : "rgba(52, 152, 219,0.5)",
							strokeColor : "rgba(151,187,205,1)",
							pointColor : "rgba(151,187,205,1)",
							pointStrokeColor : "#fff",
							data : data[1]
						}
					]
				}

				var ctx = document.getElementById("monthly").getContext("2d");
				new Chart(ctx).Line(dataset);
			},

			showVisitTypes: function(data){
				var dataset = [
					{
						value: data[0],
						color:"#1abc9c"
					},
					{
						value : data[1],
						color : "#f1c40f"
					}
				];
				var ctx = document.getElementById("visittype").getContext("2d");
				new Chart(ctx).Pie(dataset);
			}
		}

		view.init();
	},

	MenuItems: function(data){
		var view = {
			init: function(data){
				var parent = '.main';
				var page = new app.View('.script-menu', parent, {data: data});
				for (var key in page){
					view[key] = page[key];
				}
				view.data = data;
			}
		}

		app.model.menus.getItems(view.init);
	}
}