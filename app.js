
require('babel-register')
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var square = require('./routes/square').default;

var saladSpree = require('./routes/salad-spree');
var revisitGeo = require('./routes/revisitgeometry');
var fruitBas = require('./routes/fruitbasket');
var cleanFloor = require('./routes/clean-floor');
var cluster = require('./routes/cluster');
var GMO = require('./routes/GMO');
var socialDistance = require('./routes/social-distance');


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.text({type:"/"}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/square', square);
app.use('/salad-spree', saladSpree);
app.use('/revisitgeometry', revisitGeo);
app.use('/fruitbasket', fruitBas);
app.use('/clean_floor', cleanFloor);
app.use('/cluster', cluster);
app.use('/social_distancing', socialDistance);
app.use('/intelligent-farming', GMO);

// catch 404 and forward to error handler`
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
