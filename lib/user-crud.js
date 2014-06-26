var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/crudusers');

var db = mongoose.connection;

db.on('error', function(error){
    console.log("connection error: "+error.message);
});

db.once('open', function(){
    console.log("Connected successfull!")
});

var Schema = mongoose.Schema;

var Users = new Schema({
    firstname: { type: String, required: true},
    surname:  { type: String, required: true},
    username: { type: String, required: true},
    password: { type: String, required: true}
});

Users.path('username').validate(function (input){
    return (input>6);
});
