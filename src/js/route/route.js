angular.module('hci')
.config(function($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise("/home");
  
  $stateProvider
    .state('home', {
      url: "/home",
      controller: "HomeController",
      templateUrl: "src/view/home.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "src/view/login.html"
    });
});
