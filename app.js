var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
//app.set('env','production');
var config = require('./config/'+app.get('env').trim());//开发环境配置文件
//var config = require("./config/production" );//生产环境配置文件
var manifest = require(config.manifest);

// view engine setup
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('manifest', manifest);


 for(var key in manifest) {
  if(manifest.hasOwnProperty(key) && key.match(/\.js$/)){
    if(key.match("jQuery")) config.requireJS["map"]["*"]['jquery'] =  manifest[key].replace(/\.js$/, "");
    else config.requireJS["map"]["*"][key.replace(/\.js$/, "")] = manifest[key].replace(/\.js$/, "");
  }
}

app.set("config", config.requireJS);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/statics')));
app.use(express.static(path.join(__dirname, '/public')));


require('./routes/index')(app)

/*app.use('/', index);
app.use('/users', users);*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}



app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
