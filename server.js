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
	res.render('pages/pilot1');
});

app.listen(8080);
console.log('server listening on port 8080');