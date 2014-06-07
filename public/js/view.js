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

	this.template = Handlebars.compile(source, data);
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
		this.$el = $(this.templateClass).last().append(this.template);
	}
	else if(this.position == 'prepend'){
		$(this.parent).prepend('<div class="' + this.templateClass.substr(1) + '"></div>');
		this.$el = $(this.templateClass).first().append(this.template);
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
	Tables: function(){
		var parent = '.container';

		var view = new app.View('.script-tables', parent);
	}
}