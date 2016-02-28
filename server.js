// server.js

var express = require('express'),
		path = require('path');

var fs = require('fs');
var jsonfile = require('jsonfile')
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.render('pages/index');
});

app.get('/pilot1', function(req, res) {
	res.render('pages/pilot1');
});

app.get('/pilot2', function(req, res) {
	res.render('pages/pilot2');
});

app.post('/pilot1',function(req, res){
	var data = {};
	data.name = req.body.name;
	data.task = req.body.task;
  data.time = req.body.time;
  data.path = JSON.parse(req.body.path);

  // console.log(data);
  res.end('yes');

	var file = 'data/pilot1/'+ Date.now() +'.json'
	var obj = data;
 
	jsonfile.writeFile(file, obj, function (err) {
		if (err) {
	  	return console.log(err);
		}
	})
});

app.post('/pilot2',function(req, res){
	var data = {};
	data.name = req.body.name;
	data.task = req.body.task;
  data.time = req.body.time;
  data.path = JSON.parse(req.body.path);

  // console.log(data);
  res.end('yes');

	var file = 'data/pilot2/'+ Date.now() +'.json'
	var obj = data;
 
	jsonfile.writeFile(file, obj, function (err) {
		if (err) {
	  	return console.log(err);
		}
	})
});

app.listen(8080);
console.log('server listening on port 8080');