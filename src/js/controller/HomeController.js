angular.module('hci')
  .controller('HomeController', function ($rootScope, $scope, $timeout, $q, ApiCourse) {
    var self = $scope;
    var apiCourse = new ApiCourse();
    
    self.simulateQuery = false;
    self.isDisabled = false;
    self.states = loadAll();
    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;
    self.loading = false;
    
    self.enrolledCourses = ["dddd", "ssss", "aaaa", "ffff", "gggg", "hhhh"];
    
    function querySearch(query) {
      var results = query ? self.states.filter(createFilterFor(query)) : self.states,
        deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    
    function searchTextChange(text) {
      $scope.loading = false;
    }
    
    function selectedItemChange(item) {
      if(!!!item){ $scope.loading = false; return ;}
      
      $scope.loading = true;
      $scope.courses = [];
      $scope.courses.code = item.value;
      apiCourse.getInfo(item.value).then(function(resp){
        $scope.courses = resp.data;
        $scope.loading = false;
      }, function(resp){
        $scope.loading = false;
        alert("Course not found");
      });
    }

    function loadAll() {
      return Object.keys(courses).map(function (key) {
        return {
          value: key,
          display: key + ": " + courses[key].name["en"]
        };
      });
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }
    
    self.enroll = function(id){
      console.log(id);
    }
  });
