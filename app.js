var express = require('express')
  , hbs = require('hbs');

var app = express();

app.set('view engine', 'hbs');
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.get('/', function(req, res){
  res.send('hello world');
});

var port = process.env.PORT || 1337;
app.listen(port,function(){
  console.log('listening on port ' + port)
});