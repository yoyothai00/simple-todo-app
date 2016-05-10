angular.module('hci', ['ngMaterial', 'ui.router', 'ngStorage', 'ngMessages', 'ngCookies'])
  .controller('HciController', function ($rootScope, $scope, $cookies, $state) {
    
    $scope.paths = $rootScope.paths || [];
    $scope.logout = function () {
      $cookies.remove("userID");
      $state.go('login');
    };
    $scope.goto = function(state){
      $state.go(state);
    };
  })
