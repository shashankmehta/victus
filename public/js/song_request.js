 var socket = io.connect(window.location.href);
	socket.on('test', function(msg){
		console.log(msg);
	})