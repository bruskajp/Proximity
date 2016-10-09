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

app.controller('chatController', function($scope, $http) {
  $scope.sendMessage = function() {
    // send a message to a channel.
  }
});

app.controller('createController', function($scope, $http) {
  $scope.createChannel = function() {
    // Send the information for creating a channel and set their chat to
    // that controller
  }
});

app.controller('nearMeController', function($scope, $http) {
});

app.controller('navController', function($scope, $http) {
  $scope.goToNearMe = function () {
    // Grab the channels near the user and display them
  }
});
