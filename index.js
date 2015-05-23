// var express = require('express');
// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
// var path = require('path');
// var mysql = require('mysql');
// var db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'node'
// });

// db.connect(function(err){
//     if (err) console.log(err)
// });

// var tags = []

// app.use(express.static(__dirname + '/css'));

// app.get('/', function(req,res){
// 	res.sendFile(path.join(__dirname + '/index.html'));
// });

// app.get('/f', function(req,res){
// 	res.sendFile(path.join(__dirname + '/first.html'));
// });

// io.on('connection', function(socket){
// 	socket.on('chat message', function(data){
// 		console.log('message: ' + data);
// 		if(data.length > 0) {
// 			io.emit('chat message', {
// 				message: data, 
// 				token: socket.token
// 			});	
// 		}
// 	});
// 	socket.on('tag input', function(data){
// 		if(data.length > 0) {
// 			io.emit('tag input', {
// 				tagname: data
// 			});
// 		}
// 	});


	// socket.on('tag input', function(data){
	// 	if(data.tagname.length > 0) {
	// 		io.emit('tag input', {
	// 			tag: data.tagname
	// 		});
	// 		var post  = {token: data.token, tagname: data.tagname};
	// 		var query = db.query('INSERT INTO tags SET ?', post, function(err, result) {	
	// 	  	// Neat! 
	// 		});
	// 	}
	// });
// 	socket.on('disconnect', function(){
// 		console.log('user disconnected');
// 	});
// 	socket.on('token', function(token){
// 		socket.token = token;
// 	});
// });

// http.listen(3003, function(){
// 	console.log('listening on *:3003');
// });




var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');


app.use(express.static(__dirname + '/css'));

app.get('/', function(req,res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/f', function(req,res){
	res.sendFile(path.join(__dirname + '/first.html'));
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
	socket.on('tag input', function(data){
		if(data.length > 0) {
			io.emit('tag input', {
				tagname: data
			});
		}
	});
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('token', function(token){
		socket.token = token;
	});

	socket.on('token init', function(){
		socket.token = token;
	});
});

http.listen(3003, function(){
	console.log('listening on *:3003');
});