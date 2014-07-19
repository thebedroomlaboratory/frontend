var urlPre = '';

module.exports = function(app){
	//get all sensors & switches Status
	app.get(urlPre+'/zone/all', function (request, response) {
		response.send('Not yet implemented');
	    
	});

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

	

	

	

}