'use strict';

angular.module('frontendApp')
    .controller('ZoneCtrl', ['$scope', 'Powerstrip', function($scope, Powerstrip){
        $scope.powerstrip = {};

        Powerstrip.query(function(response){
            $scope.powerstrip = response;
        });
    }]);
