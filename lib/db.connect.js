var mongoose = require('mongoose');
var data = require('./datasetup');
var Q = require('q');


var Db = require('mongodb').Db
	Server = require('mongodb').Server;



module.exports = function(){

	Q(function(){ var db = new Db('crudusers', new Server('localhost', 27017));

	db.dropCollection('zones', function(err, result) {
	    	if(err) console.log("Error dropping", err)

	    	console.log('result', result);

	    });
	db.close();
	}()).then(function(){

	mongoose.connect('mongodb://localhost/crudusers');

	var db = mongoose.connection;

	db.on('error', function(error){
	    console.log("connection error: "+error.message);
	});

	db.once('open', function(){
	    console.log("Connected successfull!");

	});
	}()).then(

	data()
	).catch(function (error){
		console.log('Error',error)
	}).done();
}

