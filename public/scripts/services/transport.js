'use strict';

var tblServices = angular.module('tbl.services', ['ngResource', 'tbl.config']);

tblServices.factory('Zone', ['$resource', 'httpSettings', function($resource, httpSettings){
    return $resource('http://'+ httpSettings.baseUrl +':'+ httpSettings.basePort+'/zone/id/:zone_id')
}]);

tblServices.factory('Powerstrip', ['$resource', 'httpSettings', function($resource, httpSettings){
    return $resource('http://'+ httpSettings.baseUrl +':'+ httpSettings.basePort+'/zone/powerstrip/')
}]);

