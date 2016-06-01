var app = angular.module('MonterailApp', ['ui.router', 'ngAnimate', 'ngAnimate', 'angularModalService','ui.bootstrap' ]);
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
      return $http.get('/data/users.json');
    }
  };
});

app.controller('QuestionsController', function($scope, getData){
  getData.getQuestions().then( function(response){
    $scope.questions = response.data;
  });
  // $scope.loadPostsInit = function($scope){
  //   var limit = 3;
  //   offset = 0;
  //   console.log($scope.allQuestions);
  //   $scope.questions = $scope.allQuestions.slice(offset,limit);
  // }
  // $scope.loadPosts = function($scope){
  //   var limit = 3;
  //   offset = 3;
  //   $scope.questions= $scope.questions.slice(offset,limit);
  // }
});

app.controller('LoadController', function($scope, getData){
  getData.getQuestions().then( function(response){
    $scope.allQuestions = response.data;
    console.log($scope.allQuestions);
  })
  this.allQuestionsVar = $scope.allQuestions;
  this.qustionsToLoad = [];
  this.limit = 3;
  this.offset = 0;
  $scope.loadPostsInit = function($scope){
    console.log('asd');
    console.log(this.allQuestionsVar );
    this.qustionsToLoad = this.allQuestionsVar.slice(this.offset,this.limit);
    return this.qustionsToLoad;
  }
  $scope.loadPosts = function($scope){
    console.log('asd');
    this.qustionsToLoad = this.allQuestionsVar.slice(this.offset,this.limit);
    return this.qustionsToLoad;
  }
});

app.controller('SortingControler', function($scope){
  $scope.setSorting = function(sorter){
    $scope.sorting = sorter;
    console.log('sdf');
  };
  $scope.getSorting = function() {
    return $scope.sorting;
  };
});

app.controller('DiscusionsController', function($scope, getData){
  getData.getDiscusion().then( function(response){
    $scope.discusions = response.data;
  });
});

app.controller('SingleQuestionsController', function($scope,  getData){
  getData.getQuestions().then( function(response){
    $scope.questions = response.data.slice(0,1);
  });
});


app.controller('UserController', function($scope, getData){
  getData.getUser().then( function(response){
    $scope.users = response.data;
  });
});




app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/main");
  $stateProvider
    // HOME STATE
    .state('main', {
        url: '/main',
        templateUrl: 'templates/all-questions.html'
    })

    // Single qustions
    .state('single', {
        url: '/question',
        templateUrl: 'templates/single-question.html'
    })

    // user modal
    .state('user', {
      url: '/user',
    })
});

app.run(function ($rootScope, $uibModal) {
  /**
   * Listen to the `$stateChangeStart` event
   */
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    /**
     * if the new state is not "user", then ignore it
     */
    if(toState.name !== 'user') return;
    /**
     * Open the modal window
     */
    $uibModal.open({
        templateUrl:'templates/user-modal.html',
        controller: function($scope){
          // Do whatever you need here.
        }
      });
    /**
     * Prevent the transition to the dummy state, stay where you are
     */
    event.preventDefault();
  })
});
