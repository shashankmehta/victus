window.app = window.app || {};

app.helpers = {
  clear: function(){
    $('.main').html('');
  }
}

Handlebars.registerHelper('vegCheck', function(tags){
  var string = '';
  for(var i in tags){
    if(tags[i] == 'veg'){
      string += '<span class="veg text-success">' + tags[i] + '</span>, ';
    }
    else if(tags[i] == 'non-veg' || tags[i] == 'nonveg'){ 
      string += '<span class="nonveg text-danger">' + tags[i] + '</span>, ';
    }
    else {
      string += tags[i] + ', ';
    }
  }
  string = string.substr(0, string.length-2);
  return new Handlebars.SafeString(string);
});

app.cache = {};
app.orders = 1;

$(document).ready(function(){

  var rid = $('#rid').val();
  var tid = $('#tid').val();

  // make a request to /visit/start
  $.ajax({
    url: '/visit/start?rid=' + rid + '&tid=' + tid,
    type: 'GET',
    async: false,
    success: function(data) {
      if(data.result) {
        console.log('Visit was marked! Yay!');
      }
    }
  });

  var routes = {
    '/': function(){
      app.helpers.clear();
      var template = Handlebars.compile($('.script-main-page').html());
      var view = template();
      $('.main').html(view);

      var menu = new app.view.MenuItems;
    },

    '/order-placed': function(){
      app.helpers.clear();
      var template = Handlebars.compile($('.script-after-order').html());
      var view = template();
      $('.main').html(view);

      var menu = new app.view.MenuItems;
    },
  };

  app.router = Router(routes);
  app.router.init();

  if(window.location.hash == ''){
    window.location.hash = '/';
  }


});