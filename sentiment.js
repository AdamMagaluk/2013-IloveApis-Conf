var sentiment = require('sentiment')
  , extend  = require('extend');


function filterTweet(tweet){
  var d = new Date(tweet.created_at);
  var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

  var dString = d.getHours() + ':'+d.getMinutes() + ' ' + d.getDate() + ' ' + monthNames[d.getMonth()] + ' ' + d.getFullYear();

  var obj = {
    text : tweet.text,
    created_at : tweet.created_at,
    date : dString,
    id : tweet.id,
    user : {
      id : tweet.user.id,
      name : tweet.user.name,
      screen_name : tweet.user.screen_name,
      profile_image_url : tweet.user.profile_image_url,
    },
    geo : tweet.geo,
    coordinates : tweet.coordinates,
    place : tweet.place,
    retweeted : tweet.retweeted,
  }
  return obj;
}

module.exports = analyzeTweet;
function analyzeTweet(tweet,callback){
  sentiment(tweet.text,function(err,res){
    if(err)
      return callback(err);

    tweet = filterTweet(tweet);
    tweet.sentiment = res;
    callback(null,tweet);
  });
}