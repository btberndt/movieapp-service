/**
	Movieapp - Backend Service to search the Open Movie Database

	Request:
		POST request including JSON with "name" (required) and "year" (optional) keys

	Response:
		JSON response from the OMDB API at http://www.omdbapi.com

	Author:
		Brian Berndt

	Version:
		1.0, 14-Nov-2017

**/

var express = require('express');
var request = require("request");
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// Define Port
var port = process.env.PORT || 8080;

// Define Express API Router
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set Index to use router
app.use('/', router);

app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Define POST response
router.post('/', function (req, res) {
	if (req.body.name == null || req.body.name == "") {
		res.send("{\"error: {\"Validation\": \"No search value for JSON key \"name\" found\"}}");
		return;
	}

	var queryObject;

	if (req.body.year == null || req.body.year == "") {
		queryObject = { s: req.body.name };
	} else {
		queryObject = { s: req.body.name, y: req.body.year };
	}

	request({
		uri: "http://www.omdbapi.com/?apikey=6921cf7f",
		method: "GET",
		timeout: 10000,
		qs: queryObject
	}, function (error, response, body) {
		if (error) {
			console.log('error:', error); // Print the error if one occurred
		} else {
			console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		}
		res.send(response);
	});

});

// Define GET response
router.get('/', function(req, res) {
	res.send("{\"error: {\"HTTP\": \"Method not supported; only POST requests are accepted\"}}");
});

// Listen on port
app.listen(port);

console.log('Running on port: ' + port);

module.exports = app;
