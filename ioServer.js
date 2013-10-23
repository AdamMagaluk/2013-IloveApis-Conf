var util = require('util')
  , engine = require('engine.io')
  , async = require('async')
  , hue = require("node-hue-api")
  , T = require('./twit')
  , analyzeTweet = require('./sentiment')
  , color = require('./color')

var HueApi = hue.HueApi
  , lightState = hue.lightState;

function parseJSON(data){
  try{
    return JSON.parse(data);
  }catch(err){
    return null;
  }
}

// Send message to everyone but (optionally) the sending client
function broadcast(mssg, id) {
  for( var key in this.clients ) {
    if(typeof id !== 'undefined') {
      // Don't broadcast to sending client
      if(key == id)
        continue;
    }
    this.clients[key].send(mssg);
  }
}

module.exports = Server;
function Server(http,opts){
  if(!(this instanceof Server) )
    return new Server(http,opts);

  this.opts = {
    initialQuerySize : 50,
    returnLength : 10,
    maxLength : 50,
    updateInterval : 1500, // ms
    hueHost : process.env.HUE_HOST,
    hueUser : process.env.HUE_USER,
    hueLevel : 1,
    hueLight : 4,
    hueUpdateInterval : 1500
  };

  this._server = engine.attach(http);
  this._server.on('connection', this.onConnection.bind(this) );
  this._server.broadcast = broadcast;
  
  this._state = {
    query : '',
    mood : {
      val : 0,
      rgb : [],
      hue : 0
    },
    tweets : {
      positive : [],
      negitive : []
    },
    light : {
      connected : false
    },
    lastUpdate : null
  };

  this.tweets = [];
  this._stream = null;


  this.lastHueUpdate = new Date().getTime();
  this.hue = new HueApi(this.opts.hueHost,this.opts.hueUser);

  this.lightOff();
};

Server.prototype.onConnection = function(socket) {
  this.sendState();
  socket.on('message', this.onMessage.bind(this) );
  socket.on('close', this.onClose.bind(this) );
};

Server.prototype.onMessage = function(data){
  var msg = parseJSON(data);
  if(msg.query){
    return this.updateQuery(msg.query); 
  }
};

Server.prototype.onClose = function(){
  console.log('on close')
};

Server.prototype.updateQuery = function(query) {
  var self = this;

  self.stopTwitterStream();  

  //var d = new Date();
  //var sinceTimeStamp = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate()-1;
  T.get('search/tweets', { q: query, count: self.opts.initialQuerySize }, function(err, reply) {
    if(err)
      return console.log(err)

    async.map(reply.statuses,analyzeTweet,function(err,results){
      if(err)
        return console.log(err);

      self._state.query = query;
      self.tweets = [];
      self._state.tweets.positive = [];
      self._state.tweets.negitive = [];

      self.processTweets(results);

      self.sendState();

      self.startTwitterStream(query);

    });
  });
};

Server.prototype.processTweets = function(tweets) {
  var self = this;

  if(!util.isArray(tweets))
    tweets = [tweets];

  // Add tweets to list,
  self.tweets = tweets.concat(self.tweets);

  // only allow list to grow to a certian len  
  self.tweets = self.tweets.slice(0,self.opts.maxLength);

  // Get and sort only positive tweets
  var positive = self.tweets
                      .filter(function(a){ return a.sentiment.score > 0 })
                      .sort(function(a,b){ return b.sentiment.score - a.sentiment.score; });

  // Get and sort only negitive tweets
  var negitive = self.tweets
                      .filter(function(a){ return a.sentiment.score < 0 })
                      .sort(function(a,b){ return a.sentiment.score - b.sentiment.score; });

  // Add top ten neg and pos tweets to state sent to clients.
  self._state.tweets.positive = positive.slice(0,self.opts.returnLength);
  self._state.tweets.negitive = negitive.slice(0,self.opts.returnLength);

  // Reclcmood
  self.calcMood();
  //console.log('process ' + tweets.length + ' all ' + self.tweets.length,positive.length,negitive.length);
};


Server.prototype.calcMood = function() {
  var sentiment = {
    score : 0,
    comparative : 0
  };

  this.tweets.forEach(function(t){
    sentiment.score += t.sentiment.score;
  });

  sentiment.comparative = sentiment.score / this.tweets.length;

  var c = color(sentiment.comparative)
  this._state.mood.val = sentiment.comparative;
  this._state.mood.hue = c.hue;
  this._state.mood.rgb = c.rgb;
  this._state.mood.hexColor = c.hexColor;

  this.updateLight(this._state.mood.rgb);
};

Server.prototype.sendState = function(query) {
  this._state.lastUpdate = new Date().getTime();
  this._server.broadcast(JSON.stringify( { state : this._state } ));
};


Server.prototype.updateLight = function(rgb) {

  var now = new Date().getTime();
  if(now - this.lastHueUpdate < this.opts.hueUpdateInterval){
    return;
  }
  
  this.lastHueUpdate = now;
  var h = this._state.mood.hue*360;

  var state = lightState.create().transition(1).hsl(h,100,50).on();
  this.hue.setLightState(this.opts.hueLight, state,function(err){
    console.log(err)
  }); 
};

Server.prototype.lightOff = function() {
  var state = lightState.create().transition(0).off();
  this.hue.setLightState(this.opts.hueLight, state,function(err){
    console.log(err)
  });
};

Server.prototype.startTwitterStream = function(query){
  var self = this;

  self._stream = T.stream('statuses/filter', { track: [query] })
  self._stream.on('tweet', function (tweet) {

    analyzeTweet(tweet,function(err,tweet){
      if(err)
        return console.error(err);

      self.processTweets(tweet);

      var now = new Date().getTime();
      if(now - self._state.lastUpdate > self.opts.updateInterval)
        self.sendState();

    })
  });

  self._stream.on('disconnect', function (disconnectMessage) {
    self._stream = null;
  });
};

Server.prototype.stopTwitterStream = function(){
  if(this._stream)
    this._stream.stop();
};

