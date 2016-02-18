// server.js

var express = require('express'),
		path = require('path');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.render('pages/index');
});

app.get('/pilot1', function(req, res) {


	var items = {};

	item1st = {
		'A', 'B', 'C', 'D'
	};

	item2nd = {
		'E', 'F', 'G', 'H',
		'I', 'J', 'K', 'L',
		'M', 'N', 'O', 'P',
		'Q', 'R', 'S', 'T'
	};

	res.render('pages/pilot1', items);
});

app.listen(8080);
console.log('server listening on port 8080');