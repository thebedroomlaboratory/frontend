'use strict';

angular.module('frontendApp')
    .controller('ZoneCtrl', ['$scope', 'Powerstrip', 'Zone', function($scope, Powerstrip, Zone){

        $scope.zones = [];

        for(var i=1; i<5; i++){
            Zone.get({zone_id: i}).$promise
                .then(function(zone){
                    console.log(zone);
                    $scope.zones.push(zone);
                })
        }

        var _getZoneByNumber = function(zones, num){
            for(var i=0; i<zones.length; i++){
                if(zones[i].zone_id == num){
                    return zones[i];
                }
            }
        }

        $scope.getZoneName = function(zoneNum){
            var zone = _getZoneByNumber($scope.zones, zoneNum);
            return zone.zone_name;
        }

        $scope.getWirelessSensorData = function(zoneNum){
            var zone = _getZoneByNumber($scope.zones, zoneNum);

            console.log('$scope.zones',$scope.zones);

            $scope.barChart = [];
            $scope.barChart.push({
                name: 'temperature',
                score: zone.tempature
            })
            $scope.barChart.push({
                name: 'light',
                score: zone.lux
            })
        }

        /**
         * Update socket state.
         *
         * @type {boolean} socket is on or off.
         */
        $scope.sendSocketState = function(socketNum, socketState){
            var state = {}
            state['socket'+socketNum] = socketState;
            Powerstrip.save({}, state);
        }


        /**
         * ##################### Wireless Sensors ########################
         */
        $scope.sensor1 = {}
        $scope.sensor2 = {}
        $scope.sensor3 = {}


        /*    Hard Coded at moment*/
        $scope.totalWatts = 200;
	    $scope.data = [{
	    	name: 'sensor1',
	    	score: 89
	    },
	    {
	    	name: 'sensor2',
	    	score: 34
	    }];
	    $scope.doorOpen = false;
	    $scope.toggleDoor = function (){
	    	//console.log("toggleDoor", $scope.doorOpen);
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


    }]);
