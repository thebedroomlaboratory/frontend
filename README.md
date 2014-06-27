secure-rest
===========
###steps
npm init
npm install express --save
npm install path --save



create server.js and code most basic server
```js
var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, "public"))); // starting static fileserver, that will watch `public` folder (in our case there will be `index.html`)

app.get('/api', function(request, response){
    response.send('BAM! you got a response');
});

app.listen(1234, function(){
    console.log('Our First Express/Node Server listening on port 1234');
});
```
Now that we can serve from a public directory we can add static content in our public directory
    If you want to continue with front end dev you can install  bower for front end dependencie (npm of the front end).
        `npm install bower --save`
    We can define where our bower dependences are installed inside a `.bowerrc` with a path
        ```json
        {
            "location" : "public/js/vendor"
        }
        ```
    We will continue with this later when we want to combine our server-side and Front end into a fullstack app.

Back to the server-Side

We want to create a barebones CRUD api, so first we need another module, expresses method-override module, which lets us use HTTP verbs such as PUT or DELETE in places where the client doesn't support it **NOTE:** It is very important that this module is used before any module that needs to know the method of the request

```bash
    npm install method-override --save
```
and inside server.js add the following just after the express require
```js
//add after our express require
var methodOverride = require('method-override');
//add after the static directory setup
app.use(methodOverride());
```

No we can simulate DELETE and PUT, so lets add some Endpoints. add the following just before the `app.listen(...)`
```js
app.get('/api/user', function(request, response) {
    response.send('This is not implemented now');
});

app.post('/api/user', function(request, response) {
    response.send('This is not implemented now');
});

app.get('/api/user/:id', function(request, response) {
    response.send('This is not implemented now');
});

app.put('/api/user/:id', function (request, response){
    response.send('This is not implemented now');
});

app.delete('/api/user/:id', function (request, response){
    response.send('This is not implemented now');
});
```
So before we can take the next step with our restfull api we need to set up where and how our data is stored. This is where [MongoDB]() & [Mongoose.js]() come into play..


Firstly make sure you have MongoDB running. this can usually be done running the command `mongod`

next install the Node Mongodb module as well as the Mongoose.js module
```bash
npm install mongoose --save
```
So rather then make our Server more complex then it needs to be, lets create a CRUD module to store our database interaction. create a new folder called lib and a new javascript "user-crud.js"

So lets get a connection to mongodb going...

```js
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crudusers');

var db = mongoose.connection;

db.on('error', function(error){
    console.log("connection error: "+error.message);
});

db.once('open', function(){
    console.log("Connected successfull!")
});
```
next we want to create a Schema and from that a Model which we can export to use in our serve routes:

```js
var Schema = mongoose.Schema;

var User = new Schema({
    firstname: { type: String, required: true},
    surname:  { type: String, required: true},
    username: { type: String, required: true},
    password: { type: String, required: true}
});

var UserModel = mongoose.model("User", User);

module.exports.UserModel = UserModel;

```
Now in order to use this model we need to import it into out `server.js`
```js
//include after our other "required" modules
var UserModel    = require('./lib/user-crud').UserModel;
````
and now we update our routes, lets start with the add method , so we can actually create data. replace out post method with the following

```js
app.post('/api/user', function (request, response) {
   var user = new UserModel({
        firstname: request.body.firstname,
        surname:  request.body.surname,
        username: request.body.username,
        password: request.body.password
   });
   user.save( function (error){
        if(!error){
            console.log("User '"+user.username+"' Created!");
            return response.send({status: 'OK', user:user})
        } else {
            console.log(err);
            response.statusCode = 500;
            response.send({ error: 'Server error' });
        }
   });
});
```

now if you try to post to this you may run into a few issues like "firstname not defined" and if you debug it you will probably find the same is true for request.body....

This is because we need to include the express body parser, in Express 4 we do this by including the following with the rest of our configuration:
```js
app.use(bodyParser.urlencoded({extended: true}))
```
this allows us to parse application/x-www-form-urlencoded paramaters, the extended true allows us to extended parse syntax with the qs module

now in postman swe setup a request up as shown below
[SCREENSHOT HERE]

now lets set up our method to get all users, update a user and delete a user:
```js
app.get('/api/user', function (request, response) {
    return UserModel.find(function (error, users) {
        if (!error) {
            return response.send(users);
        } else {
            response.statusCode = 500;
            console.log('Internal error(%d): %s',response.statusCode,error.message);
            return response.send({ error: 'Server error' });
        }
    });
});
app.put('/api/user/:id', function (request, response){
    return UserModel.findById(request.params.id, function (error, user) {
        if(!user) {
            response.statusCode = 404;
            return response.send({ error: 'Not found' });
        }

        user.firstname = request.body.firstname;
        user.surname = request.body.surname;
        user.username = request.body.username;
        user.password = request.body.password;
        return user.save(function (error) {
            if (!error) {
                console.log("user updated");
                return response.send({ status: 'OK', user:user });
            } else {
                if(error.name == 'ValidationError') {
                    response.statusCode = 400;
                    response.send({ error: 'Validation error' });
                } else {
                    response.statusCode = 500;
                    response.send({ error: 'Server error' });
                }
                console.log('Internal error(%d): %s',response.statusCode,error.message);
            }
        });
    });
});

app.delete('/api/user/:id', function (request, response){
    return UserModel.findById(request.params.id, function (error, user) {
        if(!user) {
            response.statusCode = 404;
            return response.send({ error: 'Not found' });
        }
        return user.remove(function (err) {
            if (!error) {
                console.log("User removed");
                return response.send({ status: 'OK' });
            } else {
                response.statusCode = 500;
                console.log('Internal error(%d): %s',response.statusCode,error.message);
                return response.send({ error: 'Server error' });
            }
        });
    });
});
```

Test with postman

and there you go, your first restfull API... its pretty simple but also lacking. In the Next tutorial we're goin to introduce Mongoose validation to ensure values being added to our database are as expected, encription on our password field and also Access Controll using OAuth and Passport.js


Sources
- http://aleksandrov.ws/2013/09/12/restful-api-with-nodejs-plus-mongodb/
- http://expressjs.com/4x/api.html
- http://scotch.io/bar-talk/expressjs-4-0-new-features-and-upgrading-from-3-0
- https://github.com/expressjs/method-override
- http://thewayofcode.wordpress.com/2013/04/21/how-to-build-and-test-rest-api-with-nodejs-express-mocha/
- https://www.npmjs.org/package/body-parser
- 