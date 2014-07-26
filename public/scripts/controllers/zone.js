'use strict';

angular.module('frontendApp')
    .controller('ZoneCtrl', ['$scope', 'Powerstrip', 'Zone', function($scope, Powerstrip, Zone){
        $scope.powerstrip = {};
        $scope.zones = {};

        // TODO: delete me
        var data = {};
        for(var i=1; i<5; i++){
            data = Zone.get({zone_id: i});
            console.log('Zone [' + i + '] data: ', data);
        }

        // TODO: delete me
        var sockets = [
            {socket1: true},
            {socket2: true},
            {socket3: true},
            {socket4: true}
        ];

        for(var i=0; i<sockets.length; i++){
            Powerstrip.save({}, sockets[i]);
        }

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
