var MongoClient = require('mongodb').MongoClient
, assert = require('assert');

var async = require('async');
// Connection URL
var url = 'mongodb://localhost:27017/volleyStats';
// Use connect method to connect to the Serverv

MongoClient.connect(url, function(err, db) {
  var redis = require("redis"),
      client = redis.createClient();

  assert.equal(null, err);

  console.log("Connected correctly to BBDD");

  var express = require('express');
  var app = express();
  // var app = express();

  var play = require('./routes/plays')({database : db});
  var players = require('./routes/players')({database : db});
  var teams = require('./routes/teams')({database : db});
  var matches = require('./routes/matches')({database : db});
  var positions = require('./routes/positions')({database : db});
  
  var HTTP_PORT= 8080;

  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var favicon = require('static-favicon');


  // app.use('/images', express.static(__dirname + '/public/images'));
  // app.use('/videos', express.static(__dirname + '/public/videos'));
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded());
  // app.use(cookieParser());


  app.use(express.static(__dirname + '/public'));
  app.use('/images', express.static(__dirname + '/public/images'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());

  var multipart = require('connect-multiparty');
  var multipartMiddleware = multipart({
      uploadDir: './myTemp' 
  });

  // app.use(multipart);


  app.get('/hello', function (req, res) {
    res.send('hello');
  });

  //WHILE NOT SSL CERT DEPLOYED
  app.get('/api/plays', play.getPlays);
  app.get('/api/currentMatch/:teamId', matches.getCurrentMatch);
  app.get('/api/teams', teams.getTeams);
  app.get('/api/teams/:id', teams.getTeam);
  app.get('/api/players/:teamId', players.getPlayersFromTeam);
  app.get('/api/defpositions/:teamId', positions.getDefPositions);
  app.get('/api/atqpositions/:teamId', positions.getAtqPositions);
  //PUT REQUEST
  // secureApp.put('/api/spikes/:id', spikes.updateSpike);

  //POST REQUEST
  app.post('/api/matches', matches.createMatch);
  app.post('/api/positions', positions.createPositions);
  app.post('/api/play', play.createPlay);
  app.post('/api/players', multipartMiddleware, players.createPlayer);
  app.post('/api/teams', teams.createTeam);
  //DELETE REQUEST
  // secureApp.delete('/api/spikes/:id', spikes.deleteSpike);


  app.listen(HTTP_PORT);
  
  console.log('Listening http on port ' + HTTP_PORT );

});

