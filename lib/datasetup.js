var ZoneModel    = require('../lib/zone.model').ZoneModel;
var Q = require('q');


module.exports = function(){

	var zone1 = new ZoneModel();    
	zone1.zone_name= "Power Strip";
	zone1.zone_id = 1;
	zone1.power = 0;
	zone1.voltage = 0;
	zone1.socket1 = true;
	zone1.socket2 = true;
	zone1.socket3 = true;
	zone1.socket4 = true;



	var zone2 = new ZoneModel(); 
	zone2.zone_name = "Ground floor";
	zone2.zone_id = 2;
	zone2.power = 0;
	zone2.lux = "15";
	zone2.tempature = "35";
	zone2.humidity = 33;
	zone2.lightStatus = true;
	zone2.doorOpen = false;
	

	var zone3 = new ZoneModel(); 

	zone3.zone_name = "First floor";
	zone3.zone_id = 3;
	zone3.power = 0;
	zone3.lux = "10";
	zone3.tempature = "22";
	zone3.humidity = "33";
	zone3.lightStatus = true;


	var zone4 = new ZoneModel(); 

	zone4.zone_name = "Demo Sensor";
	zone4.zone_id = 4;
	zone4.lux = "20";
	zone4.tempature = "24";
	zone4.humidity = "36";
	zone4.lightStatus = true;

	Q(ZoneModel.remove({}, function(err) { 
	   console.log('Zone collections removed') 
	})
		).then(
		zone1.save(function (err){
				if(err) console.log('Error', err);

				console.log('zone 1 added');
			})
		).then(
			zone2.save(function (err){
				if(err) console.log('Error', err);

				console.log('zone 2 added');
			})

		).then(
			zone3.save(function (err){
				if(err) console.log('Error', err);

				console.log('zone 3 added');
			})

		).then(
			zone4.save(function (err){
				if(err) console.log('Error', err);

				console.log('zone 4 added');
			})

		).catch(function (error){
			console.log("Q ERROR", error)
		}).done(console.log("initial Data Setup"));
}
