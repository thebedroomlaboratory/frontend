var Req = require('request');
var Q = require('q');

var ZoneModel    = require('../lib/zone.model').ZoneModel;

var urlPre = '';

var ZONE = {
	powerstrip: 'Power Strip',
	groundFloorSensor: 'Ground floor',
	firstFloorSensor: 'First floor',
	demoSensor: 'Demo Sensor'
};

module.exports = function(app){
	
	/* For Development only */
	app.get('/test/string', function (request, response) {

		var object = {
			string: "test"

		}

		response.send(object);
		
	    
	});


	//get all sensors & switches Status
	app.get('/zone/powerstrip', function (request, response) {

		var object = {
			sensorType : 0,
			voltage : 35,
			power: 300,
			socket1 : true,
			socket2 : true,
			socket3 : true,
			socket4 : true,
			override1: false,
			override2: false,
			override3: false,
			override4: false
		}
		response.send(object);
		
	    
	});
	//update socket
	app.post('/zone/powerstrip/:id', function (request, response) {

		console.log(request.params.id);
	
		switch(request.params.id){
			case '1':
			console.log('case','one')
			break;
			case '2':
			console.log('case','two')
			break;
			case '3':
			console.log('case','three')
			break;
			case '4':
			console.log('case','four')
			break;

			default: 
			console.log('case','default')

		}

		/*var socket1 = request.body.socket1,
			socket2 = request.body.socket2,
			socket3 = request.body.socket3,
			socket4 = request.body.socket4;*/



		Req("http://localhost:1234/test/string").pipe(response);

	});

	//get door status
	app.get('/zone/door', function (request, response){

		var sensor = {
			sensorType : 1,
			lux : 3000,
			temp: 19,
			humidity : 40,
			lightingStatus : true,
			door : true
		}

		response.send(object);

	});
	//get 
	app.get('/zone/firstFloor/1', function (request, response){

		var object = {
			sensorType : 2,
			lux : 3000,
			temp: 19,
			humidity : 40,
			lightingStatus : true
		};

		response.send(object);

	});
	app.get('/zone/basic/1', function (request, response){

		var object = {
			sensorType : 2,
			lux : 3000,
			temp: 19,
			humidity : 40,
			lightingStatus : true
		};

		response.send(object);

	});

	//Node To Gallalio
	app.get('/gal/all', function (request, response){
		console.log("get");
		ZoneModel.find({},function (error, zones){

			
			var zoneMap = [];
         	zones.forEach(function(zone) {
         		console.log('zone', zone);
	            zoneMap[zone.zone_name] = zone;
	            console.log('ZONE.powerstrip', ZONE.powerstrip);
	            console.log('zones', zones);
	            console.log('zoneMap', zoneMap);
	             console.log('zoneMap[ZONE.firstFloorSensor]', zoneMap[ZONE.firstFloorSensor]);
	           
         	});
         	var	object = {
					socket1 : zoneMap[ZONE.powerstrip].socket1,
					socket2 : zoneMap[ZONE.powerstrip].socket2,
					socket3 : zoneMap[ZONE.powerstrip].socket3,
					socket4 : zoneMap[ZONE.powerstrip].socket4,
					zone1 : {
						lightingStatus : zoneMap[ZONE.groundFloorSensor].lightStatus,
						door : zoneMap[ZONE.groundFloorSensor].doorOpen

					},
					zone2: {
						lightingStatus : zoneMap[ZONE.firstFloorSensor].lightStatus 

		 	 		},
		 	 		zone3:{
						lightingStatus : zoneMap[ZONE.demoSensor].lightStatus 

		 	 		}
		 	 		
				};

				
			response.send(object);
    
		});

	
         	
	});
	

	//Gallalio to Node
	app.post('/gal/all', function (request, response){

		console.log('request.body', request.body);

		var voltage = request.body.voltage;
			power = request.body.power,
			zone_g_lux = request.body.zone_g_lux,
			zone_g_temp = request.body.zone_g_temp,
			zone_g_humidity = request.body.zone_g_humidity,
			zone_g_door = request.body.zone_g_door.toLowerCase(),
			zone_f_lux = request.body.zone_f_lux,
			zone_f_temp = request.body.zone_f_temp,
			zone_f_humidity = request.body.zone_f_humidity,
			zone_d_lux = request.body.zone_d_lux,
			zone_d_temp = request.body.zone_d_temp,
			zone_d_humidity = request.body.zone_d_humidity;

		Q(
			ZoneModel.findOne({'zone_name':ZONE.groundFloorSensor}, function (errors, zone){
				if(zone_g_lux !== undefined && zone_g_lux !== null){
					zone.lux = new Number(zone_g_lux);
				}
				if(zone_g_humidity !== undefined && zone_g_humidity !== null){
					zone.humidity = zone_g_humidity;
				}
				if(zone_g_temp !== undefined && zone_g_temp !== null){
					zone.tempature = zone_g_temp;
				}
				if(zone_g_door !== undefined && zone_g_door !== null && (zone_g_door === 'true' || zone_g_door === 'false')){
					zone.doorOpen = (zone_g_door === 'true') ? true : false;
					console.log('zone.doorOpen', zone.doorOpen);
				}

				zone.save(function (err){
					if(err) console.log('Error', err);

					console.log('zone groundfloor completed');
				});
			})
		).then(
			ZoneModel.findOne({'zone_name':ZONE.firstFloorSensor}, function (errors, zone){
				if(zone_f_lux !== undefined && zone_f_lux !== null){
					zone.lux = zone_f_lux;
				}
				if(zone_f_humidity !== undefined && zone_f_humidity !== null){
					zone.humidity = zone_f_humidity;
				}
				if(zone_f_temp !== undefined && zone_f_temp !== null){
					zone.tempature = zone_f_temp;
				}

				zone.save(function (err){
					if(err) console.log('Error', err);

					console.log('zone firstfloor completed');
				});

			})
		).then(
			ZoneModel.findOne({'zone_name':ZONE.demoSensor}, function (errors, zone){
				if(zone_d_lux !== undefined && zone_d_lux !== null){
					zone.lux = zone_d_lux;
				}
				if(zone_d_humidity !== undefined && zone_d_humidity !== null){
					zone.humidity = zone_d_humidity;
				}
				if(zone_d_temp !== undefined && zone_d_temp !== null){
					zone.tempature = zone_d_temp;
				}

				zone.save(function (err){
					if(err) console.log('Error', err);

					console.log('zone demoSensor completed');
				});

			})
		).catch(function (error){
			console.log("Q ERROR", error)
		}).done(response.send({status:'completed successfully'}));

	});
	

};