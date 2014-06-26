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

We want to create a barebones CRUD api, so first we need another module, expresses method-override module, which lets us use HTTP verbs such as PUT or DELETE in places where the client doesn't support it **NOTE:** __It is very important that this module is used before any module that needs to know the method of the request__``````````````

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
```
So before we can take the next step with our restfull api we need to set up where and how our data is stored. This is where [MongoDB]() & [Mongoose.js]() come into play..


Firstly make sure you have MongoDB running. this can usually be done running the command `mongod`

next install the Node Mongodb module as well as the Mongoose.js module
```bash
npm install mongoose --save
```
So rather then make our Server more complex then it needs to be, lets create a CRUD module to store our database interaction. create a new folder called lib and a new javascript "user-crud.js"




Sources
- http://aleksandrov.ws/2013/09/12/restful-api-with-nodejs-plus-mongodb/
- http://scotch.io/bar-talk/expressjs-4-0-new-features-and-upgrading-from-3-0
- https://github.com/expressjs/method-override
- http://thewayofcode.wordpress.com/2013/04/21/how-to-build-and-test-rest-api-with-nodejs-express-mocha/
