var T = require('../twit')
  , async = require('async')
  , analyze = require('../sentiment');


var stream = T.stream('statuses/filter', { track: ['obama'] })

stream.on('tweet', function (status) {
  console.log(status.created_at,':',status.text.replace(/\n/g,'') )
})

stream.on('disconnect', function (disconnectMessage) {
  console.log(disconnectMessage)
})

stream.on('warning', function (warning) {
  console.log(warning)
})