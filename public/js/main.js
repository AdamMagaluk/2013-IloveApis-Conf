$(document).ready(function () {

  var $title = $("#title");
  var $input = $("#query");
  var $submit = $("#btn-go");
  var $positiveList = $('.positive-tweets');
  var $negitiveList = $('.negitive-tweets');
  var socket = new eio.Socket();

  var lastQuery = '';
  $submit.click(function(e){
    var val = $input.val();
    console.log('submit ' + val)

    if(val === lastQuery)
      return false;

    lastQuery = val;

    var msg = {
      query : lastQuery
    };

    socket.send(JSON.stringify(msg));
    
    return false;
  });


  
  socket.on('open', function () {

    $('.ui-state .ui-unconnected').hide()
    $('.ui-state .ui-connected').show()

    socket.on('message', function (data) {
      try{
        var msg = JSON.parse(data);
      }catch(err){
        console.error(err);
      }

      if(msg.state){

        if($input.is(":focus"))
          return;

        $title.html(msg.state.query);

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

        $('body').css('background-color',msg.state.mood.hexColor);
      }
      
    });

    socket.on('close', function () {
      $('.ui-state .ui-connected').hide()
      $('.ui-state .ui-unconnected').show()
    });

  });

});