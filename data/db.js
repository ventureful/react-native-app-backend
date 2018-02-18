var mongoose = require('mongoose');
// Connection string
var dburl = 'mongodb://readWrite:1234@127.0.0.1:10180/lotery';

mongoose.connect(dburl);
// When the connection is made
mongoose.connection.on('connected', function(){
	console.log('Mongoose connected to ' + dburl);
});
// When disconnected
mongoose.connection.on('disconnected', function(){
	console.log('Mongoose disconnected.');
});
// When error
mongoose.connection.on('error', function(err){
	console.log('Mongoose connection error: ' + err);
});
// When app stops
process.on('SIGINT', function(){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through app termination.');
		process.exit(0);
	});
});

process.on('SIGTERM', function(){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through app termination.');
		process.exit(0);
	});
});

process.once('SIGUSR2', function(){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through app termination.');
		process.kill(process.pid, 'SIGUSR2');
	});
});

// Bring in schemas and models
require('./models/modelos.js');
