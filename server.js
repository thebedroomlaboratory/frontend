var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var PORT = 9000;

require('./lib/db.connect')();

app.use(express.static(path.join(__dirname, "public"))); // starting static fileserver, that will watch `public` folder (in our case there will be `index.html`)
//Handles post requests
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride());

require('./routes/user.routes')(app);
require('./routes/zone.routes')(app);

app.listen(PORT, function(){
    console.log('Our First Express/Node Server listening on port '+PORT);
});
