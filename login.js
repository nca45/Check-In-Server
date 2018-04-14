
var express = require('express');
var app = express();
var serverIndex = require('serve-index');
var http = require('http');
var MongoClient = require('mongodb').MongoClient;

var url = //ENTER YOUR DATABASE HERE

var database;

MongoClient.connect(url, function(err, client){
  if (err) console.log(err);
  console.log('connected');
  database = client.db(''); // ENTER YOUR DATABASE HERE
});

var port = 3000;
admin = {"id":1, "uname":"admin", "password":"1234"};

var head = `<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no"/>
    <meta charset="utf-8">
    <title>Users</title>
    <link rel="stylesheet" href="./css/landingform.css"/>
    <script src="./js/jquery.min.js"></script>
    <script src="./js/landingScript.js"></script>
</head>
<body>`;

var _head = `
</body>
</html>`;

var checkInId = null;
var allowCheckIn = false;
var currentUsers = [];
var currentCollection;
// parsing body
app.use(express.json());
app.use(express.urlencoded( { extended:false} ));

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm','html'],
  index: "login.html"
}

app.use('/', function(req,res,next){
  console.log(req.method, 'request:', req.url, JSON.stringify(req.body));
  next();
});

app.get('/checkin', function(req, res, next){
  if(checkInId && allowCheckIn){

    res.send(checkInId);
  }
});

app.use('/', express.static('./pub_html', options));
app.use('/files', serverIndex('pub_html/files', {'icons': true}));

app.get('/getId/:id', function(req,res,next){
    currentUsers = []; //clear the current user list for next session
    checkInId = req.params.id;
    allowCheckIn = true;
    console.log(checkInId);
    res.end();
});

app.post('/getIdHistory/:id', function(req,res,next){

    currentUsers = []; //clear the current user list for next session
    checkInId = req.params.id;
    console.log(checkInId);
    res.end();
});

app.get('/checkInSummary', function(req,res,next){

    allowCheckIn = false;
    var collection = database.collection(checkInId);
    collection.insert(currentUsers);
    res.json(currentUsers);
});

app.get('/latestCheckIn', function(req,res,next){

    if(currentUsers.length > 0){
      res.json(currentUsers[currentUsers.length-1]);
    }
    else{
      res.send('No one has checked in yet!');
    }
});

app.get('/getHistory', function(req,res,next){

    var collection = database.collection(checkInId);
    collection.find().toArray(function(err, result){
      res.json(result);
    });
});

app.post('/thanks', function(req,res,next){

  var webpage;
  //insert your info into the database
  if(!allowCheckIn || (req.body.checkString !== checkInId)){

    webpage = `<p>Error: Check-Ins are closed or cannot find a check-in with that string</p>`;
  }
  else{

    webpage = `<h1 style = "text-align:center"> Thank you, you have been checked in! </h1> `; 
    var date = new Date();
    var user = {name:req.body.name, userID:req.body.userID, date:date.toLocaleString()};
    currentUsers.push(user);
  }
  webpage = head + webpage + _head;
  res.end(webpage);
});


app.post('/login', function(req,res){
  // find user
  user = null;
  if(admin.uname===req.body.uname){
    
    user = admin;
  }

  if (!user){
    res.redirect('/');
  } else {
    if (req.body.password === user.password){
      // success, serve landing page dynamically
      var form = `<h1>ADMIN LANDING PAGE</h1>
      <section>

       <label for="checkId">CHECK-IN ID: </label> <br />
       <input placeholder="Enter Check-in ID" name="checkId" type="text" required />

       <br />
       <button id="directCheckIn" onclick="startCheckIn()">START CHECK-IN</button>
       <button id="directHistory" onclick="startHistory()">VIEW HISTORY</button>
       <button id="deleteAll" onclick="deleteFrom()">DELETE USERS</button>

      </section>
      <div id='error'></div>`;

      form = head + form + _head;
      res.end(form);
    } else {
      res.redirect('/');
    }
  }
});

app.delete('/deleteFrom:id', function(req,res,next){

  database.listCollections({name: req.params.id})
    .next(function(err, collinfo) {
        if (collinfo) {
            // The collection exists
            var collection = database.collection(req.params.id);
            collection.drop();
            res.send('All users deleted from '+req.params.id);
        }
        else{
          res.send('Error: '+req.params.id+' does not exist');
        }
      })
});

app.listen(port);
console.log("app running on", port);