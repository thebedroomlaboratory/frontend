'use strict';

angular.module('frontendApp')
    .controller('ZoneCtrl', ['$scope', 'Powerstrip', function($scope, Powerstrip){
        $scope.powerstrip = {};

        Powerstrip.query(function(response){
            $scope.powerstrip = response;
        });

        /*    Hard Coded at moment*/
        $scope.totalWatts = 200;
	    $scope.data = [{
	    	name: 'sensor1',
	    	score: 89
	    },
	    {
	    	name: 'sensor2',
	    	score: 34
	    },
	    {
	    	name: 'sensor3',
	    	score: 68
	    }];
	    $scope.doorOpen = false;
	    $scope.toggleDoor = function (){
	    	console.log("toggleDoor", $scope.doorOpen);
	    	if($scope.doorOpen == false){
	    		$scope.doorOpen = true;
	    	}
	    	else if($scope.doorOpen == true){
	    		$scope.doorOpen = false;
	    	}
	    }
	    $scope.sockets = [true, true, true, true]


	    $scope.toggleSocket = function (socket){
	    	if($scope.sockets[socket] == true){
	    		$scope.sockets[socket] = false;
	    	}else {
	    		$scope.sockets[socket] = true;
	    	}
	    }


	    $scope.light_1_active = true;
	    $scope.light_2_active = true;
	    $scope.light_3_active = true;
	    console.log('socket1', $scope.sockets[1])
    }]);
