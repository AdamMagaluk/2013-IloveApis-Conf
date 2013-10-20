var T = require('../twit')
  , async = require('async')
  , analyze = require('../sentiment');




T.get('search/tweets', { q: '#realtimeconf since:2013-10-19', count: 100 }, function(err, reply) {
  console.log(err)

  async.forEach(reply.statuses,function(tweet,callback){
    analyze(tweet.text,function(err,val){
      //console.log(arguments)
      console.log(tweet.created_at,':',val.score,val.comparative,tweet.text.replace(/\n/g,'') )
      callback();
    })
  },function(err){ })
})
