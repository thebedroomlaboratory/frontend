'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
angular
  .module('frontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'tbl.services',
    'tbl.config',
    'd3.directives'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/house', {
        templateUrl: 'views/house.html',
        controller: 'ZoneCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).config(function($httpProvider) {
        $httpProvider.defaults.headers.post  = {'Content-Type': 'application/x-www-form-urlencoded'};
    });;
