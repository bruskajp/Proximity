var dbinterface = require('./Server/mongoApi.js')

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var api = require('./routes/api');

var app = express();

// Socket.io initialization
var http = require('http').Server(app)
var io = require('socket.io').listen(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

//app.use('/', routes);
app.use('/api', api);

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('*', routes.partials);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;


// This is the socket.io code

var allClients = [];

io.on('connection', function(socket){
  console.log('user connected: ' + socket.id);
  socket.emit('join', socket.id);

  socket.on('join', function(msg){
    console.log(msg);
    allClients.push({'uuid':socket.id, 'uid':msg.uid, 'loc':msg.loc, 'topic':msg.topic})
    console.log(socket.id);
    if(!dbinterface.topicExists(msg.loc, msg.topic)){
      dbinterface.createTopic(msg.loc, msg.topic)
    }else{
      dbinterface.incNum(msg.loc, msg.topic)
    }
  });

  socket.on('disconnect', function(){
    var i = 0;
    for(var sub of allClients){
      if(sub.uuid === socket.id){
        allClients.splice(i,1);
        //console.log(sub.loc + "  " + sub.topic);
        dbinterface.decNum(sub.loc, sub.topic);
      }
      ++i;
    }
    console.log("user disconnected: " + socket.id);
    for(var sub of allClients){
      console.log(sub);
    }
  });

  socket.on('msg', function(msg){
    //console.log(msg);
    var channel = msg.chan;
    var date = new Date();
    console.log(date.toString());
    var newMsg = {"uid":msg.uid, "date":date, "data":msg.data};
    console.log(channel);
    console.log(newMsg);
    // addMsg(msg.loc, msg.topic, newMsg);
    io.emit(channel, newMsg);
  });
});

// Socket.io listen
http.listen(3001, function(){
  console.log('listening on *:3000');
});




