var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


app.use(express.static(__dirname + '/css'));

app.get('/', function(req,res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

io.on('connection', function(socket){
	socket.on('chat message', function(data){
		console.log('message: ' + data);
		if(data.length > 0) {
			io.emit('chat message', {
				message: data, 
				token: socket.token
			});	
		}
	});
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('token', function(token){
		socket.token = token;
	});
});

http.listen(3003, function(){
	console.log('listening on *:3003');
});