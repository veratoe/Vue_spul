require('./app/index');

var express = require('express');
var app = new express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3000;

var stdin = process.stdin;

app.get("/",  function(request, response) {
	response.sendFile(__dirname + "/views/index.html");
});

io.on('connection', function (socket) {
	console.log('A user logged in');
	socket.emit('message', 'Le happy welcome!');
	socket.on("chat message", function (message) { console.log('<<< Le message: ' + message); });

	stdin.on('data', function (key) {
		console.log(">>>" + key);
		socket.emit('message', String(key));
	});
	
});


app.use(express.static('public'));

http.listen(port, function(error) {
	console.log('Listening on port ', port);
});
