var app = angular.module('MonterailApp', ['ui.router']);
app.factory('getData', function($http, $q) {
  return {
    getQuestions: function() {
      // the $http API is based on the deferred/promise APIs exposed by the $q service
      // so it returns a promise for us by default
      return $http.get('/data/questions.json');
    },
    getDiscusion: function() {
      // the $http API is based on the deferred/promise APIs exposed by the $q service
      // so it returns a promise for us by default
      return $http.get('/data/discussions.json');
    }
  };
});

app.controller('QuestionsController', function($scope, getData){
  getData.getQuestions().then( function(response){
    $scope.questions = response.data.slice(0,3);
  });
});

app.controller('DiscusionsController', function($scope, getData){
  getData.getDiscusion().then( function(response){
    $scope.discusions = response.data;
    console.log($scope.discusions);
  });
});

app.controller('SingleQuestionsController', function($scope,  getData){
  getData.getQuestions().then( function(response){
    $scope.questions = response.data.slice(0,1);
    console.log($scope.questions);
  });
});

app.controller('SortingController', function($scope){
  $scope.filter = 'recent';
  this.selectFilter = function(selectedFilter){
    $scope.filter = selectedFilter;
  }
});


app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/main");
  $stateProvider
    // HOME STATES AND NESTED VIEWS ========================================
    .state('main', {
        url: '/main',
        templateUrl: 'templates/all-questions.html'
    })

    // nested list with custom controller
    .state('single', {
        url: '/question',
        templateUrl: 'templates/single-question.html'
    })


});
