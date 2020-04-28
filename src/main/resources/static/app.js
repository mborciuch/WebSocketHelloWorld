let webSocket;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
}

function connect(){
    webSocket = new WebSocket('ws://localhost:8080/user');
    webSocket.onmessage = function(data){
        helloWorld(data.data);
    };
    setConnected(true);
}

function disconnect(){
    if (webSocket != null){
        webSocket.close();
    }
    setConnected(false);
    console.log("Websocket is in disconnected state");
}

function sendData(){
    const data = JSON.stringify(
        {'user' : $("#user").val()}
    );
    webSocket.send(data);
}

function helloWorld(message){
    $("#helloworldmessage").append(" " + message + "");
}

$(function () {
  $("form").on('submit', function (e) {
     e.preventDefault();
  });
  $("#connect").click(function () {
      connect()
  });
  $("#disconnect").click(function () {
      disconnect();
  });
  $("#send").click(function () {
      sendData();
  })
})