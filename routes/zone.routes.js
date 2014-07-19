var Req = require('request');

var urlPre = '';

module.exports = function(app){
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

	app.post('/zone/powerstrip', function (request, response) {

		var socket1 = request.body.socket1,
			socket2 = request.body.socket2,
			socket3 = request.body.socket3,
			socket4 = request.body.socket4;

		Req("http://weather.yahooapis.com/forecastrss?w=2502265").pipe(response);

	});

	app.get('/zone/door', function (request, response){

		var object = {
			sensorType : 1,
			lux : 3000,
			temp: 19,
			humidity : 40,
			lightingStatus : true,
			door : true
		}

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




/*

	//get status of sensors & switchs in a Zone
	app.get(urlPre+'/zone/:id', function (request, response){
	    response.send('Not yet implemented');
	});

	app.get(urlPre+'/zone/:id/sensors', function (request, reaponse){
		response.send('Not yet implemented');
	});

	app.get(urlPre+'/zone/:id/triggers', function (request, reaponse){
		response.send('Not yet implemented');
	});

	//get value of a particular sensor
	app.get(urlPre+'/sensor/:id', function (request, response) {
	  	response.send('Not yet implemented');
	});
	//get value of a particular sensor
	app.get(urlPre+'/trigger/:id', function (request, response) {
	    response.send('Not yet implemented');
	});

	//set value of a particular sensor
	app.post(urlPre+'/sensor/:id', function (request, response) {
	  	response.send('Not yet implemented');
	});
	//set value of a particular trigger
	app.post(urlPre+'/trigger/:id', function (request, response) {
	    response.send('Not yet implemented');
	});

	//get tempature
	app.get(urlPre+'/tempature/:zone', function (request, reaponse){
		response.send('Not yet implemented');
	});

	//get light
	app.get(urlPre+'/light/:zone', function (request, reaponse){
		response.send('Not yet implemented');
	});

	//get humidity
	app.get(urlPre+'/humidity/:zone', function (request, reaponse){
		response.send('Not yet implemented');
	});
*/
	

}