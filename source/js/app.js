var app = angular.module('MonterailApp', ['ui.router', 'ngAnimate', 'ngAnimate', 'angularModalService' ]);
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
    },
    getUser: function() {
      // the $http API is based on the deferred/promise APIs exposed by the $q service
      // so it returns a promise for us by default
      return $http.get('/data/user.json');
    }
  };
});

app.controller('QuestionsController', function($scope, getData, ModalService){
  getData.getQuestions().then( function(response){
    $scope.questions = response.data.slice(0,3);
  });
  $scope.showComplex = function() {

    ModalService.showModal({
      templateUrl: "templates/user-modal.html",
      controller: "ExampleModalController"
    }).then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {

      });
    });

  };
});



app.controller('DiscusionsController', function($scope, getData){
  getData.getDiscusion().then( function(response){
    $scope.discusions = response.data;
    console.log($scope.discusions);
  });
  $scope.getDate = function(date){
    var convertedDate = new Date();
    var today = new Date();
    var d  = new Date(date);
    console.log(today);
    convertedDate = (today.getTime() - d.getTime());
    //convertedDate = new Date(convertedDate);
    console.log(new Date(convertedDate));
    return convertedDate;
  };
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


app.controller('UserController', function($scope, getData){
  getData.getDiscusion().then( function(response){
    $scope.discusions = response.data;
    console.log($scope.discusions);
  });
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
