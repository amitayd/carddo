'use strict';

angular.module('frontendApp', ['ngRoute', 'ngTouch'])
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
      .when('/create/:sourceWord', {
        templateUrl: 'views/createCard.html',
        controller: 'CreateCard'
      })      
      .when('/create', {
        templateUrl: 'views/createCard.html',
        controller: 'CreateCard'
      })
      .otherwise({
        redirectTo: '/'
      });
  });