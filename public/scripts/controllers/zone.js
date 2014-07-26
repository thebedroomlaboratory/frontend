'use strict';

angular.module('frontendApp')
    .controller('ZoneCtrl', ['$scope', 'Powerstrip', 'Zone', '$http', function($scope, Powerstrip, Zone, $http){

        $scope.zones = {};
         $scope.barChart;
         $scope.zones;
         $scope.sockets = [];
         var transform = function(data){
                return $.param(data);
            };
         $scope.powerZone = {
            power : 0,
            voltage: 0
         };
          $scope.data = [];

        for(var i=1; i<5; i++){
            Zone.get({zone_id: i}).$promise
                .then(function(zone){
                    console.log(zone);
                    if(zone.zone_id!==1){
                    $scope.data.push({
                        name : zone.zone_name+' Lux',
                        score : new Number(zone.lux)
                    });
                    $scope.data.push({
                        name : zone.zone_name+' Temperature',
                        score : new Number(zone.tempature)
                    });
                    //if(zone.humidity !== undefined){
                        $scope.data.push({
                            name : zone.zone_name+' humidity',
                            score : new Number(zone.humidity)
                        });

                        if(zone.doorOpen !== undefined){
                            $scope.doorOpen = zone.doorOpen;
                            console.log('doorOpen', zone.doorOpen);
                        }
                        if(zone.zone_id===2){
                            $scope.light_1_active = zone.lightStatus;
                        }
                        if(zone.zone_id===3){
                            $scope.light_2_active = zone.lightStatus;
                        }
                        if(zone.zone_id===4){
                            $scope.light_3_active = zone.lightStatus;
                        }
                   // }
                }else {
                    $scope.sockets.push(zone.socket1);
                    $scope.sockets.push(zone.socket2);
                    $scope.sockets.push(zone.socket3);
                    $scope.sockets.push(zone.socket4);

                    //$scope.zones[zone.zone_id]=zone;
                }
                })
        }
         //$scope.$watch($scope.data, function( old, newvar){
            /*$scope.data = [{
            name: 'sensor1',
            score: $scope.zones[1]
            },
            {
                name: 'sensor2',
                score: $scope.zones[2]
            }];
        })*/
         

       /* var _getZoneByNumber = function(zones, num){
            for(var i=0; i<zones.length; i++){
                if(zones[i].zone_id == num){
                    return zones[i];
                }
            }
        }

        $scope.getZoneName = function(zoneNum){
           
            var zone = _getZoneByNumber($scope.zones, zoneNum);
           if(zone !== undefined) return zone.zone_name;
            //return "temp name";
            return;
        }*/

       /* $scope.getWirelessSensorData = function(zoneNum){
            var zone = _getZoneByNumber($scope.zones, zoneNum);
            console.log('zone',zone);
            console.log('$scope.zones',$scope.zones);

           

            $scope.barChart = {};
            $scope.barChart({
                name: 'temperature',
                score: zone.tempature
            })
            $scope.barChart.push({
                name: 'light',
                score: zone.lux
            })

        }*/

        /**
         * Update socket state.
         *
         * @type {boolean} socket is on or off.
         */
        $scope.sendSocketState = function(socketNum, socketState){
            var state = {}
            state['socket'+socketNum] = socketState;
            console.log('state', state);
            var array = []; array.push('socket1');
            var arrayKey = []; arrayKey.push(true);
            

            
          /*  $http({
                method: 'POST',
                url: 'http://localhost:9000/zone/powerstrip/',
                data: transform(state),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(result) {
              console.log(result.data);
            });
            */

              Powerstrip.save({}, transform(state));
           /* $http.post('http://localhost:9000/zone/powerstrip/', state).then(function(result) {
              console.log(result.data);
            });*/
        }


        /**
         * ##################### Wireless Sensors ########################
         */
        $scope.sensor1 = {}
        $scope.sensor2 = {}
        $scope.sensor3 = {}


        /*    Hard Coded at moment*/
        $scope.totalWatts = 200;
        /*$scope.data = [{
            name: 'sensor1',
            score: $scope.zones[1]
        },
        {
            name: 'sensor2',
            score: $scope.zones[2]
        }];*/
        
        $scope.toggleDoor = function (){
            //console.log("toggleDoor", $scope.doorOpen);
            if($scope.doorOpen == false){
                $scope.doorOpen = true;
            }
            else if($scope.doorOpen == true){
                $scope.doorOpen = false;
            }
        }

        //$scope.sockets = //[true, true, true, true]


        $scope.toggleSocket = function (socket){
            if($scope.sockets[socket] == true){
                $scope.sendSocketState(socket+1, false);
                $scope.sockets[socket] = false;
            }else {
                $scope.sockets[socket] = true;
                $scope.sendSocketState(socket+1, true);
            }
        }
        $scope.updateLight = function (id){
            id+=1;
            if(id !==1){
                var value = ($scope.light_1_active ===true ) ? false : true;
                var state = {
                    lightStatus : value
                };
                 console.log('light state', state);
                //Zone.save({zone_id: id}, transform(state));
                $http({
                method: 'POST',
                url: 'http://localhost:9000/zone/id/'+id,
                data: transform(state),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(result) {
              console.log(result.data);
            });
            }
        }

/*
        $scope.light_1_active = true;
        $scope.light_2_active = true;
        $scope.light_3_active = true;
*/

    }]);
