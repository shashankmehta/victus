$(document).ready(function() {

 	var socket = io.connect('/');

  socket.on('test', function(msg){
		console.log(msg);
	})

  socket.on('feedback', function (data) {
    // Insert feedback notification here
    console.log('Someone gave feedback');
  });

  socket.on('waiter', function (data) {
    // Insert waiter notification here
    console.log('Someone asked for a waiter');
  });

  socket.on('food', function (data) {
    // Insert order notification here
    console.log('Someone placed an order');
  });

  socket.on('payment', function (data) {
    // Insert payment notification here
    console.log('Someone asked for a check');
  });

  socket.on('new_table', function (data) {
    // Insert new customer notification here
    console.log('Someone new just came in');
  });
});
