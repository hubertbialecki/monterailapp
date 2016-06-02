var app = angular.module('MonterailApp', ['ui.router', 'ngAnimate', 'ngAnimate', 'angularModalService','ui.bootstrap' ]);
app.factory('getData', function($http, $q) {
  return {
    // emulating api behavior, content in different files
    getQuestions: function() {
      return $http.get('/data/questions.json');
    },
    getDiscusion: function() {
      return $http.get('/data/discussions.json');
    },
    getUser: function() {
      return $http.get('/data/users.json');
    }
  };
});

//Controller for all questions
app.controller('QuestionsController', function($scope, getData){
  $scope.page = 1;
  $scope.loadDisabled = false;
  $scope.allQuestions = [];
  $scope.sorting = 'recent';
  var offset = 3;
  getData.getQuestions().then( function(response){
    $scope.allQuestions = response.data;
    $scope.loadPostsInit(1);
  });
  $scope.loadPostsInit = function(page){
    $scope.questions = $scope.allQuestions.slice(0, page*offset);
    $scope.page++;
  };
  $scope.loadPosts = function(page){
    if(!$scope.loadDisabled){
      $scope.questions = $scope.allQuestions.slice(0, $scope.page*offset);
      $scope.page++;
    }
    if($scope.allQuestions.length < $scope.page*offset){
      $scope.loadDisabled = true;
    }
  };
  $scope.setSorting = function(sorter){
    $scope.sorting = sorter;
    return $scope.sorting;
  };
  $scope.getSorting = function() {
    return $scope.sorting;
  };
});

//Controller for discussion, need to be fixed, there is only one discussion
app.controller('DiscusionsController', function($scope, getData ){
  getData.getDiscusion().then( function(response){
    $scope.discusions = response.data;
  });


});

//Controller for single question, need to be fixed, render only first element, should be given parameter with ID
app.controller('SingleQuestionsController', function($scope, getData, $stateParams){
  getData.getQuestions().then( function(response){
    $scope.questions = response.data;
    $scope.singleQuestion = $scope.getQuestionById($stateParams.questionId);
  });

  $scope.getQuestionById = function(id) {
    for( var i=0; i < $scope.questions.length; i++ ){
      if( $scope.questions[i].id == $stateParams.questionId ){
        return $scope.questions[i];
      }
    }
  };

  $scope.questionVoted = false;
  $scope.questionVotedUp = false;
  $scope.questionVotedDown = false;

  $scope.vote = function(question, value){
    if(value == 'up' && ( !$scope.questionVoted )){
      question.votes++;
      $scope.questionVoted = true;
      $scope.questionVotedUp = true;
      $scope.questionVotedDown = false;
    }
    if(value == 'down' && ( !$scope.questionVoted )){
      question.votes--;
      $scope.questionVoted = true;
      $scope.questionVotedDown = true;
      $scope.questionVotedUp = false;
    }
    if(value == 'up' && ( $scope.questionVoted && $scope.questionVotedDown  && !$scope.questionVotedUp )){
      question.votes++;
      $scope.questionVoted = false;
      $scope.questionVotedUp = true;
    }
    if(value == 'down' && ( $scope.questionVoted && $scope.questionVotedUp && !$scope.questionVotedDown )){
      question.votes--;
      $scope.questionVoted = false;
      $scope.questionVotedDown = true;
    }
  }
});

//Controler for user view, need to be fixed, id of user should be given in function and request should be only for user with this id
app.controller('UserController', function($scope, getData){
  getData.getUser().then( function(response){
    $scope.users = response.data;
  });
});

//Listening for state change, loads modal window throught all app
app.run(function ($rootScope, $uibModal) {
  //Listen to the `$stateChangeStart` event
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    // if the new state is not "user", return
    if(toState.name !== 'user') return;
    // open window
    $uibModal.open({
        templateUrl:'templates/user-modal.html',
        controller: function($scope){
          //empty controller
        }
      });
    /**
     * Prevent the transition to the dummy state, stay where you are
     */
    event.preventDefault();
  })
});

//Routing - loading templates depend on state
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/main");
  $stateProvider
    // HOME STATE
    .state('main', {
        url: '/main',
        controller: 'QuestionsController',
        templateUrl: 'templates/all-questions.html'
    })

    // Single qustions
    .state('single', {
        url: '/question/{questionId}',
        controller: 'SingleQuestionsController',
        templateUrl: 'templates/single-question.html'
    })

    // user modal
    .state('user', {
      url: '/user',
    })
});
