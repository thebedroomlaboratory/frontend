'use strict';

var tblServices = angular.module('tbl.services', ['ngResource', 'tbl.config']);
/*
tblServices.factory('Powerstrip', ['$resource', 'httpSettings', function($resource, httpSettings){
    return $resource('http://'+ httpSettings.baseUrl +':'+ httpSettings.basePort+'/zone/powerstrip', {}, {
        query: {method: 'GET'}
    })
}]);
*/
/*
tblServices.factory('Zone', ['$resource', 'httpSettings', function($resource, httpSettings){
    return $resource('http://'+ httpSettings.baseUrl +':'+ httpSettings.basePort+'/zone/id/:zone_id',
    { zone_id: 1 }, {
        query: {method: 'GET'}
    })
}]);
*/

tblServices.factory('Zone', ['$resource', 'httpSettings', function($resource, httpSettings){
    return $resource('http://'+ httpSettings.baseUrl +':'+ httpSettings.basePort+'/zone/id/:zone_id')
}]);

tblServices.factory('Powerstrip', ['$resource', 'httpSettings', function($resource, httpSettings){
    return $resource('http://'+ httpSettings.baseUrl +':'+ httpSettings.basePort+'/zone/powerstrip/')
}]);