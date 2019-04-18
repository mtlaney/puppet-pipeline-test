var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');

var apiRouter = require('./routes/base');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/puppet-pipeline')));
app.use('/', express.static(path.join(__dirname, 'dist/puppet-pipeline')));
app.use('/api', apiRouter);

// mongoose connection
  mongoose
  .connect(
    'mongodb://localhost/puppet-pipeline',
    { useNewUrlParser: true }
  );

// handling 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // setup to only show errors in dev
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render error page
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;
