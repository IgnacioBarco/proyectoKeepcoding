var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwtAuth = require('./lib/jwtAuth')

require('dotenv').config()


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * Conexión con la base de datos
 */
require('./lib/connectMongoose');
require('./models/Anuncio');
require('./models/Usuario');


if (process.env.LOG_FORMAT !== 'nolog') {
  app.use(logger(process.env.LOG_FORMAT || 'dev'))
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.locals.title = 'wallaApi';

var indexRouter = require('./routes/index');
/**
 * Rutas
 */
app.use('/', indexRouter);
app.use('/users', require('./routes/users'));

/**
 * Rutas API
 */
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv1/usuarios', require('./routes/apiv1/usuarios'));

app.use('/auth/login', require('./routes/auth/login'));
app.use('/auth/register', require('./routes/auth/register'));

app.use('/public/ads', require('./routes/public/ads'));
app.use('/public/user', require('./routes/public/user'));

app.use('/private/ad', require('./routes/private/ad'));
app.use('/private/ads', require('./routes/private/ads'));
app.use('/private/user', require('./routes/private/user'));
app.use('/private/users', require('./routes/private/users'));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  
  if (typeof (err) === 'string') {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === 'ValidationError') {
    // mongoose validation error
    return res.status(400).json({ message: err.message });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({ message: 'Invalid Token' });
  }

  // default to 500 server error
  res.status(500).json({ message: err.message });
});

module.exports = app;
