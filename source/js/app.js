var app = angular.module('MonterailApp',[]);
app.factory('getData', function($http, $q) {
  return {
    getQuestions: function() {
      // the $http API is based on the deferred/promise APIs exposed by the $q service
      // so it returns a promise for us by default
      return $http.get('/data/questions.json');
    }
  };
});

app.controller('QuestionsController', function($scope, getData){
  getData.getQuestions().then( function(response){
    $scope.questions = response.data;
    console.log($scope.questions);
  });
});
