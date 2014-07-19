var mongoose = require('mongoose');

module.exports = function(){
	mongoose.connect('mongodb://localhost/crudusers');

	var db = mongoose.connection;

	db.on('error', function(error){
	    console.log("connection error: "+error.message);
	});

	db.once('open', function(){
	    console.log("Connected successfull!")
	});
}