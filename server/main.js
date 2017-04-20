var Message = require('./models/message');

var express = require('express');
var app = new express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3000;
var path = require('path');

var stdin = process.stdin;

app.get("/",  function(request, response) {
	response.sendFile(path.resolve("views/index.html"));
});

io.on('connection', function (socket) {
	console.log('A user logged in');
	socket.emit('message', 'Le happy welcome!');
	socket.on("chat message", function (message) { 
		Message.create({ message: message });
		console.log('<<< Le message: ' + message); 
	});

	Message.findAll().then(function(messages) {
		messages.forEach(function(m) {
			socket.emit('message', m.get('message'));
		});
	});

	stdin.on('data', function (key) {
		console.log(">>>" + key);
		socket.emit('message', String(key));
	});
	
});


app.use(express.static('public'));

http.listen(port, function(error) {
	console.log('Lekker luisteren op port ', port);
});


