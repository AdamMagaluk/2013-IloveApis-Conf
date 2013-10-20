var http = require('http')  
  , express = require('express')
  , IoServer = require('./ioServer')
  , hbsHelpers = require('./hbsHelpers');

var app = express();

app.set('port',process.env.PORT || 1337)
app.set('view engine', 'hbs');
app.set('views',__dirname + '/views');

app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.static(__dirname + '/public'), { maxAge: 31557600000 });
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.get('/', function(req, res){
  res.render('index');
});

var httpServer = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


var server = new IoServer(httpServer);