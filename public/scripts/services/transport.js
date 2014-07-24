'use strict';

var tblServices = angular.module('tbl.services', ['ngResource', 'tbl.config']);

tblServices.factory('Powerstrip', ['$resource', 'httpSettings', function($resource, httpSettings){
	console.log('request', 'http://'+ httpSettings.baseUrl +':'+ httpSettings.basePort+'/zone/powerstrip');
    return $resource('http://'+ httpSettings.baseUrl +':'+ httpSettings.basePort+'/zone/powerstrip', {}, {
        query: {method: 'GET'}
    })
}]);