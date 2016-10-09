var connected = false;
var uid; //= prompt("Welcome. Please enter your name");
var chan; //= prompt("Welcome. Please enter your channel");
var loc = "0000:1111";
var trueChan = ""
var socket;


var app = angular.module('myApp', ['ngRoute', 'ngResource']);
app.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/home'
    }).
    when('/chat', {
      templateUrl: 'partials/chat'
    }).
    when('/create', {
      templateUrl: 'partials/create'
    }).
    when('/nearme', {
      templateUrl: 'partials/nearme'
    }).
    otherwise({
      redirectTo: '/'
    });
});

app.controller('chatController', ['$scope', function(scope) {
  scope.messages = [];
  socket.on(trueChan, function(msg){
    //var fullMsg = {"uid":msg.uid, "date":msg.date.toString(), "data":msg.data}
    var fullMsg = msg.uid + ": " + msg.data;
    var img = '<img class="avatar" src="https://avatars2.githubusercontent.com/u/8940807?v=3&s=400"/>';
    $('#messages').append($('<chat-item>').html(img + fullMsg));
    //scope.messages.push(fullMsg);
    console.log(fullMsg);
  });
  scope.sendMessage = function(data) {
    // send a message to a channel.
    var msg = []
    var fullMsg = {"chan":trueChan, "loc":loc, "topic":chan, "uid":uid, "data":data}
    socket.emit('msg', fullMsg);
    //$('#m').val('');
    console.log(trueChan);
    return false;
  };
}]);

app.controller('createController', ['$scope', function(scope) {
  scope.createChannel = function(userName, channelName) {
    // Send the information for creating a channel and set their chat to
    // that controller 
      console.log('createController');
      console.log(userName + "   " + channelName);
      if(reciever.convertedLat != null && reciever.convertedLong != null){ 
        loc = reciever.convertedLat + ":" + reciever.convertedLong; 
        uid = userName;
        trueChan = channelName + loc; 
        socket = io(); 
          
        socket.on('connect', function(){ 
          var joinMsg = {"loc":loc, "chan":trueChan, "topic":chan, "uid":uid}; 
          socket.emit('join', joinMsg);  
      
          socket.on('join', function(msg){ 
            uuid = msg; 
          }); 
        });
        $("#clear1").val('');
        $("#clear2").val('');
        alert("You connected successfully"); 
      }else{
        alert("Alert: Your location has not been found yet.\nPlease wait a try to connect again in a few seconds");
      }
  };
}]);

app.controller('nearMeController', ['$scope', function(scope) {
  scope.loadTopics = function(){
    
  };
}]);

app.controller('navController', function($scope) {
  $scope.goToNearMe = function () {
    // Grab the channels near the user and display them
    $('#topics').empty();
    $http.get('/api/getTopics', false).then(function successCallBack(response) {
      for( var  thing of response) {
        $('#topics').append($('<li>').text(thing.topic));
      } 
    }, function errorCallback(response){
      //do nothing
    });

 
   
  }
});


var reciever = { 
  lat: null,
  long: null,
  convertedLat: null,
  convertedLong: null
};

function getLocation() {
  if (navigator.geolocation) {
    var params = {timeout: 30000};
    navigator.geolocation.getCurrentPosition(recieveLocation, locationError, params);
  } else {
    alert('Geolocation not available.');
  }
}

function recieveLocation(position) {
  reciever.lat = position.coords.latitude;
  reciever.long = position.coords.longitude;
  reciever.convertedLat = Math.floor(reciever.lat*10);
  reciever.convertedLong = Math.floor(reciever.long*10);
}

function locationError(err) {
  if(err.code == 1) {
    alert("Error: Access is denied!");
  } else if( err.code == 2) {
    alert("Error: Position is unavailable!");
  }
}

getLocation();


