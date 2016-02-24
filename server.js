// server.js

var express = require('express'),
		path = require('path');
var bodyParser = require("body-parser");
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

app.post('/pilot1',function(req, res){
	var name = req.body.name;
	var task = req.body.task;
  var time = req.body.time;
  var path = req.body.path;

  res.end('yes');
 });

app.listen(8080);
console.log('server listening on port 8080');