var express = require('express');
var methodOverride = require('method-override');
var path = require('path');
var app = express();


app.use(express.static(path.join(__dirname, "public"))); // starting static fileserver, that will watch `public` folder (in our case there will be `index.html`)
app.use(methodOverride());

app.get('/api', function(request, response){
    response.send('BAM! you got a response');
});

app.get('/api/user', function(req, res) {
    res.send('This is not implemented now');
});

app.post('/api/user', function(req, res) {
    res.send('This is not implemented now');
});

app.get('/api/user/:id', function(req, res) {
    res.send('This is not implemented now');
});

app.put('/api/user/:id', function (req, res){
    res.send('This is not implemented now');
});

app.delete('/api/user/:id', function (req, res){
    res.send('This is not implemented now');
});

app.listen(1234, function(){
    console.log('Our First Express/Node Server listening on port 1234');
});
