$(document).ready(function() {

  // Place JavaScript code here...
 	var socket = io.connect(window.location.href);
	socket.on('test', function(msg){
		console.log(msg);
	})
	socket.emit('feedback', {data: 'good'});
});
