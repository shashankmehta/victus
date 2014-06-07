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

app.view = {
	TableGroups: function(){
		var parent = '.main';

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

			init: function(data){
				var page = new app.View('.script-table-groups', parent, {data: data});
				for (var key in page){
					view[key] = page[key];
				}
				view.data = data;

				view.$('.set').click(function(){
					view.showGroupDetails(this);
				});
			}
		}

		app.model.getAllGroups(view.init);
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

		app.model.getGroupDetails(type, view.init);
		return view;
	}
}