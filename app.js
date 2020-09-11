var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')
var logger = require('morgan');
var app = express();
require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: [
    'https://chainbreak.com',
    'https://www.chainbreak.com'
  ],
  credentials: true
}));

// serve react app as static files
app.use(express.static(path.join(__dirname, '/client', 'build')));

// Attempt to route to API
const api = require('./routes/v1/index')
app.use('/api/v1/', api)

// Catches all other requests and sends them to the react index for react router
// to handle.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  /*
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  */
});

console.log('123');
module.exports = app;
