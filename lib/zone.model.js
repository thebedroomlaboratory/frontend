var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Zone = new Schema({
	zone_name: {type: String, required:true, index:{unique:true}},
    zone_id: { type: Number, required: true, index: {unique: true}},
    lux:  { type: String, required: false},
    tempature: { type: String, required: false},
    humidity: { type: String, required: false},
    voltage: {type:Number, require: false},
    power: { type: Number, required: false},
    socket1: {type: Boolean, required: false},
    socket2: {type: Boolean, required: false},
    socket3: {type: Boolean, required: false},
    socket4: {type: Boolean, required: false},
    lightingStatus : {type: Boolean, required: false},
	doorOpen : {type: Boolean, required: false},
	lightStatus: {type: Boolean, required: false}

});


var ZoneModel = mongoose.model('Zone', Zone);

module.exports.ZoneModel = ZoneModel;


