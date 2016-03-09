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

app.get('/pilot3', function(req, res) {
	res.render('pages/pilot3');
});

app.get('/pilot2_data', function(req, res) {

	var data = [];

  fs.readdir('data/pilot2/', function(err, filenames) {
    if (err) {
      onError(err);
    }

    filenames.forEach(function(filename) {
      var file = 'data/pilot2/' + filename;
      data.push(jsonfile.readFileSync(file))
    });

    res.send(data);

    // console.log(data);
    // res.render('pages/pilot2_result', { 'data' : data });
  });	

});

app.get('/pilot2_result', function(req, res) {
	res.render('pages/pilot2_result');
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

app.post('/pilot3',function(req, res){
	var data = {};
	data.name = req.body.name;
	data.task = req.body.task;
	data.rname = req.body.rname;
	data.rscore = req.body.rscore;
	data.rcircle = req.body.rcircle;
	data.rcorrect = req.body.rcorrect;
  data.time = req.body.time;
  data.path = JSON.parse(req.body.path);
  data.rpath = JSON.parse(req.body.rpath);

  // console.log(data);
  res.end('yes');

	var file = 'data/pilot3/'+ Date.now() +'.json'
	var obj = data;
 
	jsonfile.writeFile(file, obj, function (err) {
		if (err) {
	  	return console.log(err);
		}
	})
});

app.listen(8080);
console.log('server listening on port 8080');