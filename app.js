const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

// Connect to the database
mongoose.Promise = Promise;
mongoose.connect(config.databaseUrl);
mongoose.set('debug', true);

const index = require('./routes/index');
const usersApi = require('./routes/users');
const issuesApi = require('./routes/issues');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// REST API routes
app.use('/', index);
app.use('/users', usersApi);
app.use('/issues', issuesApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// API error handler (responds with JSON)
app.use('/', function(err, req, res, next) {

  // Log the error on stderr
  console.warn(err);

  // Respond with 422 Unprocessable Entity if it's a Mongoose validation error
  if (err.name == 'ValidationError' && !err.status) {
    err.status = 422;
  }

  // Set the response status code
  res.status(err.status || 500);

  // Send the error message in the response
  const response = {
    message: err.message
  };

  // If it's a validation error, also send the errors details from Mongoose
  if (err.status == 422) {
    response.errors = err.errors;
  }

  // Send the error response
  res.send(response);
});

// Generic error handler (responds with HTML)
app.use(function(err, req, res, next) {

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
