'use strict';

angular.module('frontendApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/review', {
        templateUrl: 'views/review.html',
        controller: 'ReviewCtrl'
      })
      .when('/create', {
        templateUrl: 'views/createCard.html',
        controller: 'CreateCard'
      })      
      .otherwise({
        redirectTo: '/'
      });
  });