var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

const getTasks = require('./api/routes/tasks');
const getUsers = require('./api/routes/users');
const getPriorities = require('./api/routes/priorities');

mongoose.connect('mongodb://localhost:27017/task_manager', {useNewUrlParser: true});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res, next) =>{
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Credentials', true);
  next();
})

app.use('/tasks', getTasks.router);
app.use('/users', getUsers.router);
app.use('/priorities', getPriorities.router);


app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log('error happened, err status is 500')
});

module.exports = app;
