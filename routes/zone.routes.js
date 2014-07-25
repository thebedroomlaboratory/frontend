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
	
	//get all sensors & switches Status
	app.get('/zone/id/:zone_id', function (request, response) {
		//console.log('REQ', request);
		ZoneModel.findOne({'zone_id': request.params.zone_id }, function (errors, zone){
			if(errors){
				console.log('ERROR', errors);
				response.send('status', 'Unable to get Power Zone data')
			}
			response.send(zone);
		});	
	    
	});

	//get all sensors & switches Status
	app.post('/zone/id/:zone_id', function (request, response) {

		var lightStatus = request.body.lightStatus,
			humidity = request.body.humidity,
			tempature = request.body.tempature,
			lux = request.body.lux,
			doorOpen = request.body.doorOpen;
		//console.log('REQ', request);
		ZoneModel.findOne({'zone_id': request.params.zone_id }, function (errors, zone){
			if(errors){
				console.log('ERROR', errors);
				response.send('status', 'Unable to get Zone \''+request.params.zone_id+'\' data')
			}

			if(lightStatus !== undefined && lightStatus !== null){
					zone.lightStatus = lightStatus;
			}
			if(humidity !== undefined && humidity !== null){
					zone.humidity = humidity;
			}
			if(tempature !== undefined && tempature !== null){
					zone.tempature = tempature;
			}
			if(lux !== undefined && lux !== null){
					zone.lux = lux;
			}
			if(doorOpen !== undefined && doorOpen !== null){
					zone.doorOpen = doorOpen;
			}


			response.send(zone);
		});	
	    
	});

	//update socket
	app.post('/zone/powerstrip/', function (request, response) {

		var socket1 = require.body.socket1,
			socket2 = require.body.socket2,
			socket3 = require.body.socket3,
			socket4 = require.body.socket4;

		ZoneModel.findOne({'zone_name':ZONE.powerstrip}, function (errors, zone){
				if(socket1 !== undefined && socket1 !== null){
					zone.socket1 = socket1;
				}
				if(socket2 !== undefined && socket2 !== null){
					zone.socket2 = socket2;
				}
				if(socket3 !== undefined && socket3 !== null){
					zone.socket3 = socket3;
				}
				if(socket4 !== undefined && socket4 !== null){
					zone.socket4 = socket4;
				}

				zone.save(function (err){
					if(err){
					 	console.log('Error', err);
					 	response.send('error', err);

					 }

					console.log('zone demoSensor completed');
					response.send('status', 'Power Zone updated successfully');
				});

			});

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