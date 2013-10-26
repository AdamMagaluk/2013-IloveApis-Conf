  /**
   3 5

   1.5 4
    
   0 3

   -1.5 2

   -3 1
  */
function  moodIconNumber(val) {
  var MAX = 3;
  if(val >= MAX)
    return 5;
  else if(val >= .5 && val < MAX)
    return 4;
  else if(val <= -0.5 && val > (0-MAX))
    return 2;
  else if(val <= (0-MAX))
    return 1;
  else return 3;
}

//[-3,3] -> //[0,10]
function  moodToPercent(val) {
  return (((val - (-3) ) * (100)) / (3 - (-3) )) + 0;
}



$(document).ready(function () {

  var $body = $("body");
  var $title = $(".header .title");
  var $icon = $(".header .icon");
  var $input = $("#query");
  var $submit = $("#btn-go");
  var $positiveList = $('.positive-tweets');
  var $negitiveList = $('.negitive-tweets');
  var $progressbar = $("#progressbar");
  var connectInterval = null;
  var socket = new eio.Socket();
  var reconnect = false;
  var lastQuery = '';
  var lastIcon = '';

  function  updateIcon(val) {
    var icon = '/img/faces/'+moodIconNumber( val )+'.png';
    if(lastIcon !== icon){
      $icon.attr('src',icon);
      lastIcon = icon;
    }
  }

  function onMessage(data) {
    try{
      var msg = JSON.parse(data);
    }catch(err){
      console.error(err);
    }

    if(msg.state){

      if($input.is(":focus"))
        return;

      $title.html(msg.state.query);
      updateIcon(msg.state.mood.val);

      function makeTweetLi(t){
        return Templates.tweet(t);
      }

      $positiveList.html('');
      msg.state.tweets.positive.forEach(function(t){
        $positiveList.append(makeTweetLi(t));
      });

      $negitiveList.html('');
      msg.state.tweets.negitive.forEach(function(t){
        $negitiveList.append(makeTweetLi(t));
      });

      $body.css('background-color',msg.state.mood.hexColor);
      $progressbar.css('background-color',msg.state.mood.hexColor);
      $progressbar.css('width',moodToPercent(msg.state.mood.val)+'%');

    }
  }

  function onOpen() {
    $('.ui-state .ui-unconnected').hide();
    $('.ui-state .ui-connected').show();
    clearInterval(connectInterval);

    if(reconnect)
      sendQuery();

    reconnect = false;
  }
  
  function tryReConnect(){
    reconnect = true;
    socket.open();
  }

  function onClose() {
    $('.ui-state .ui-connected').hide();
    $('.ui-state .ui-unconnected').show();
    setInterval(tryReConnect,1000);
  }
  
  socket.on('open',onOpen);
  socket.on('message',onMessage);
  socket.on('close',onClose);


  function sendQuery(){
    var msg = {
      query : lastQuery
    };
    socket.send(JSON.stringify(msg));
  }
  
  $submit.click(function(e){
    var val = $input.val();
    if(val === lastQuery)
      return false;

    lastQuery = val;
    sendQuery();
    return false;
  });

  
});